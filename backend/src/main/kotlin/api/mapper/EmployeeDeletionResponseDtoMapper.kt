package com.kaestner.api.mapper

import com.kaestner.domain.employee.domain.employee.EmployeeDeletionResult
import org.example.employeemgmt.dtos.EmployeeDeletionResponseDto
import org.springframework.stereotype.Component

/**
 * Mapper class for converting `EmployeeDeletionResult` objects to `EmployeeDeletionResponseDto` objects.
 */
@Component
class EmployeeDeletionResponseDtoMapper {
    /**
     * Maps an `EmployeeDeletionResult` to an `EmployeeDeletionResponseDto`.
     *
     * @param employeeDeletionResult The result of an employee deletion operation, containing lists of successfully
     *                               deleted employee IDs and IDs of employees that failed to be deleted.
     * @return The mapped `EmployeeDeletionResponseDto` containing the deleted and failed employee IDs.
     */
    fun mapToDto(employeeDeletionResult: EmployeeDeletionResult): EmployeeDeletionResponseDto {
        return EmployeeDeletionResponseDto(
            deletedEmployeeIds = employeeDeletionResult.deletedEmployeeIds.map { it.toString() },
            failedEmployeeIds = employeeDeletionResult.failedEmployeeIds.map { it.toString() }
        )
    }
}