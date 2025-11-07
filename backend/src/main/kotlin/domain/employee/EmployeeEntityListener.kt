package com.kaestner.domain.employee

import com.kaestner.config.BeanUtil
import com.kaestner.domain.employeeversion.EmployeeVersion
import com.kaestner.domain.employeeversion.EmployeeVersionRepository
import jakarta.persistence.PreUpdate

/**
 * JPA entity listener that creates a historical snapshot (EmployeeVersion)
 * whenever an Employee entity is updated.
 *
 * The listener is invoked by the persistence provider on lifecycle events
 * and uses [BeanUtil] to obtain the repository bean because dependency
 * injection is not available in the listener instance.
 */
class EmployeeEntityListener {

    /**
     * Called before an Employee entity is updated.
     *
     * This method builds an [EmployeeVersion] snapshot from the current state
     * of the provided Employee and persists it using [EmployeeVersionRepository].
     *
     * Implementation notes:
     * - The repository is retrieved via [BeanUtil.getBean].
     * - The method throws [IllegalArgumentException] when the Employee's id or
     *   version is null since those fields are required for the version record.
     *
     * @param employee the entity that is about to be updated
     */
    @PreUpdate
    fun onPreUpdate(employee: Employee) {
        val employeeVersionRepository = BeanUtil.getBean(EmployeeVersionRepository::class.java)

        val employeeVersion = EmployeeVersion(
            employeeId = employee.id ?: throw IllegalArgumentException("Employee ID cannot be null"),
            givenName = employee.givenName,
            surname = employee.surname,
            birthDate = employee.birthDate,
            pensionInsuranceNumber = employee.pensionInsuranceNumber,
            taxIdentificationNumber = employee.taxIdentificationNumber,
            version = employee.version ?: throw IllegalArgumentException("Employee version cannot be null"),
            createdAt = employee.updatedAt ?: throw IllegalArgumentException("Employee updatedAt cannot be null")
        )
        employeeVersionRepository.save(employeeVersion)
    }
}