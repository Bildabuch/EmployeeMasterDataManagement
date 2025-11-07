package com.kaestner.api.mapper

import com.kaestner.domain.employee.EmployeeUpdateResult
import org.example.employeemgmt.dtos.EmployeeUpdateResponseDto
import org.springframework.stereotype.Component

/**
 * Mapper that converts domain update results into API response DTOs.
 *
 * This class is a thin mapping layer between the internal service result type
 * `EmployeeUpdateResult` and the public DTO `EmployeeUpdateResponseDto` that
 * is returned by controller endpoints. Keeping this mapping centralized
 * keeps controllers simple and makes it easy to adjust the API surface
 * without touching business logic.
 */
@Component
class EmployeeUpdateResponseDtoMapper {

    /**
     * Create an EmployeeUpdateResponseDto from an EmployeeUpdateResult.
     *
     * @param employeeUpdateResult the domain result produced by the update operation.
     *                             It may contain the updated employee entity (or null)
     *                             and optionally a list of error messages.
     * @return an EmployeeUpdateResponseDto populated with the updated employee ID
     *         (if present) and any error messages returned by the domain operation.
     */
    fun mapToDto(employeeUpdateResult: EmployeeUpdateResult): EmployeeUpdateResponseDto {
        return EmployeeUpdateResponseDto(
            updatedEmployeeId = employeeUpdateResult.employee?.id.toString(),
            errorMessages = employeeUpdateResult.errorMessages
        )
    }
}