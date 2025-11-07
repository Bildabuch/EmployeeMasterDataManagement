package com.kaestner.api.mapper

import com.kaestner.domain.employee.domain.employee.EmployeeCreationResult
import org.example.employeemgmt.dtos.EmployeeCreationResponseDto
import org.springframework.stereotype.Component
/**
 * Mapper class for converting `EmployeeCreationResult` objects to `EmployeeCreationResponseDto` objects.
 */
@Component
class EmployeeCreationResponseDtoMapper {

    /**
     * Maps an `EmployeeCreationResult` to an `EmployeeCreationResponseDto`.
     *
     * @param employeeCreationResult The result of an employee creation operation, containing the created employee
     *                               and any error messages.
     * @return The mapped `EmployeeCreationResponseDto` containing the created employee ID and error messages.
     */
    fun mapToDto(employeeCreationResult: EmployeeCreationResult): EmployeeCreationResponseDto {
        return EmployeeCreationResponseDto(
            createdEmployeeId = employeeCreationResult.employee?.id.toString(),
            errorMessages = employeeCreationResult.errorMessages
        )
    }
}