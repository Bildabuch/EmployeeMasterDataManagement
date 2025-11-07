package com.kaestner.api.mapper

import com.kaestner.domain.employeeversion.EmployeeVersion
import org.example.employeemgmt.dtos.EmployeeVersionDto
import org.springframework.stereotype.Component

/**
 * Mapper class responsible for converting `EmployeeVersion` domain objects
 * to their corresponding `EmployeeVersionDto` representations.
 */
@Component
class EmployeeVersionDtoMapper {

    /**
     * Maps an `EmployeeVersion` object to an `EmployeeVersionDto`.
     *
     * @param employeeVersion The `EmployeeVersion` domain object to be mapped.
     * @return The mapped `EmployeeVersionDto` object containing the same data in DTO format.
     */
    fun mapToDto(employeeVersion: EmployeeVersion): EmployeeVersionDto {
        return EmployeeVersionDto(
            id = employeeVersion.id.toString(),
            employeeId = employeeVersion.employeeId.toString(),
            givenName = employeeVersion.givenName,
            surname = employeeVersion.surname,
            birthDate = employeeVersion.birthDate.toString(),
            pensionInsuranceNumber = employeeVersion.pensionInsuranceNumber,
            taxIdentificationNumber = employeeVersion.taxIdentificationNumber,
            version = employeeVersion.version.toString(),
            changedAt = employeeVersion.createdAt.toString()
        )
    }
}