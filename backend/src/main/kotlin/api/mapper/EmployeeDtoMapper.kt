package com.kaestner.api.mapper

import com.kaestner.domain.employee.Employee
import kotlinx.datetime.LocalDate
import org.example.employeemgmt.dtos.EmployeeDto
import org.springframework.stereotype.Component

/**
 * Mapper class for converting between `Employee` and `EmployeeDto` objects.
 */
@Component
class EmployeeDtoMapper {
    /**
     * Maps an `Employee` entity to an `EmployeeDto`.
     *
     * @param employee The `Employee` entity to be mapped.
     * @return The mapped `EmployeeDto` object.
     */
    fun mapToDto(employee: Employee): EmployeeDto {
        return EmployeeDto(
            id = employee.id.toString(),
            givenName = employee.givenName,
            surname = employee.surname,
            birthDate = employee.birthDate.toString(),
            pensionInsuranceNumber = employee.pensionInsuranceNumber,
            taxIdentificationNumber = employee.taxIdentificationNumber,
            version = employee.version.toString(),
            updatedAt = employee.updatedAt.toString()
        )
    }

    /**
     * Maps an `EmployeeDto` to an `Employee` entity.
     *
     * @param employeeDto The `EmployeeDto` to be mapped.
     * @return The mapped `Employee` entity.
     * @throws IllegalArgumentException If the `birthDate` format is invalid.
     */
    fun mapToEntity(employeeDto: EmployeeDto): Employee {
        val birthDate: LocalDate
        try {
            birthDate = LocalDate.parse(employeeDto.birthDate)
        } catch (_: Exception) {
            throw IllegalArgumentException("Invalid birthDate format: ${employeeDto.birthDate}. Expected format: YYYY-MM-DD")
        }
        return Employee(
            id = employeeDto.id?.toLongOrNull(),
            givenName = employeeDto.givenName.trim(),
            surname = employeeDto.surname.trim(),
            birthDate = birthDate,
            pensionInsuranceNumber = employeeDto.pensionInsuranceNumber.trim(),
            taxIdentificationNumber = employeeDto.taxIdentificationNumber.trim(),
            version = employeeDto.version?.toLongOrNull(),
            updatedAt =null
        )
    }
}