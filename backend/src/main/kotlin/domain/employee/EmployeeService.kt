package com.kaestner.domain.employee

import com.kaestner.domain.employee.domain.employee.EmployeeCreationResult
import com.kaestner.domain.employee.domain.employee.EmployeeDeletionResult
import jakarta.transaction.Transactional
import org.example.employeemgmt.EmployeeValidatorService
import org.springframework.dao.OptimisticLockingFailureException
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

/**
 * Service class for managing Employee entities.
 * Provides methods for creating, updating, and deleting employees.
 */
@Service
class EmployeeService(
    val employeeRepository: EmployeeRepository
) {
    /**
     * Updates an existing employee.
     *
     * @param employee The employee entity to update. Must have a valid ID.
     * @return An `EmployeeUpdateResult` containing the updated employee or validation errors.
     * @throws IllegalArgumentException If the employee ID is not set.
     * @throws NoSuchElementException If the employee with the given ID does not exist.
     * @throws StaleEmployeeException If the update fails due to concurrent modification.
     */
    @Transactional
    fun update(employee: Employee): EmployeeUpdateResult {
        if (employee.id == null) throw IllegalArgumentException("Employee id must be set for update")

        employeeRepository.findById(employee.id).orElseThrow {
            NoSuchElementException("Employee with id=${employee.id} not found")
        }

        val errorMessages = EmployeeValidatorService.validate(employee)
        if (errorMessages.isNotEmpty()) {
            return EmployeeUpdateResult(employee = null, errorMessages = errorMessages)
        }

        return try {
            EmployeeUpdateResult(employee = employeeRepository.save(employee), errorMessages = null)
        } catch (ex: OptimisticLockingFailureException) {
            throw StaleEmployeeException("Employee with id=${employee.id} could not be updated due to concurrent modification")
        }
    }

    /**
     * Creates a new employee.
     *
     * @param employee The employee entity to create.
     * @return An `EmployeeCreationResult` containing the created employee or validation errors.
     */
    @Transactional
    fun create(employee: Employee): EmployeeCreationResult {
        val errorMessages = EmployeeValidatorService.validate(employee)
        if (errorMessages.isNotEmpty()) {
            return EmployeeCreationResult(employee = null, errorMessages = errorMessages)
        }
        val savedEmployee = employeeRepository.save(employee)
        return EmployeeCreationResult(employee = savedEmployee, errorMessages = null)
    }

    /**
     * Deletes an employee by ID.
     *
     * @param employeeId The ID of the employee to delete.
     * @return An `EmployeeDeletionResult` indicating the success or failure of the deletion.
     */
    @Transactional
    fun delete(employeeId: Long): EmployeeDeletionResult {
        return try {
            employeeRepository.deleteById(employeeId)
            EmployeeDeletionResult(
                deletedEmployeeIds = listOf(employeeId),
                failedEmployeeIds = emptyList()
            )
        } catch (_: OptimisticLockingFailureException) {
            EmployeeDeletionResult(
                deletedEmployeeIds = emptyList(),
                failedEmployeeIds = listOf(employeeId)
            )
        }
    }

    /**
     * Deletes multiple employees by their IDs.
     *
     * @param employeeIds A list of IDs of the employees to delete.
     * @return An `EmployeeDeletionResult` indicating the success or failure of the deletions.
     *         Includes IDs of employees that were not found.
     */
    @Transactional
    fun deleteAll(employeeIds: List<Long>): EmployeeDeletionResult {
        val deletedEmployeeIds = mutableListOf<Long>()
        val failedEmployeeIds = mutableListOf<Long>()
        val employees = employeeRepository.findAllById(employeeIds)

        val existingEmployeeIds = employees.map { it.id }.toSet()
        val nonExistingEmployeeIds = employeeIds.filter { it !in existingEmployeeIds }
        for (employee in employees) {
            if (employee.id == null) continue
            try {
                employeeRepository.delete(employee)
                deletedEmployeeIds.add(employee.id)
            } catch (_: OptimisticLockingFailureException) {
                failedEmployeeIds.add(employee.id)
            }
        }
        return EmployeeDeletionResult(
            deletedEmployeeIds = deletedEmployeeIds,
            failedEmployeeIds = failedEmployeeIds + nonExistingEmployeeIds
        )
    }

    fun findById(id: Long): Employee? = employeeRepository.findByIdOrNull(id)
    fun findAll(): List<Employee> = employeeRepository.findAll().filterNotNull()
}