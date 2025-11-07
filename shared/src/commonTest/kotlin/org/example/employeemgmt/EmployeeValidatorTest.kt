package org.example.employeemgmt

import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue


class EmployeeValidatorTest {

    @Test
    fun validate_returnsEmptyList_whenAllFieldsAreValid() {
        val employee = Employee(
            givenName = "John",
            surname = "Doe",
            pensionInsuranceNumber = "12310199A904",
            taxIdentificationNumber = "18530459176",
            birthDate = LocalDate.parse("1987-03-06"),
            updatedAt = LocalDateTime.parse("2023-01-01T12:00:00")
        )

        val result = EmployeeValidator.validate(employee)

        assertTrue(result.isEmpty())
    }

    @Test
    fun validate_returnsError_whenGivenNameIsBlank() {
        val employee = Employee(
            givenName = "",
            surname = "Doe",
            pensionInsuranceNumber = "12310199A904",
            taxIdentificationNumber = "18530459176",
            birthDate = LocalDate.parse("1990-01-01"),
            updatedAt = LocalDateTime.parse("2023-01-01T12:00:00")
        )

        val result = EmployeeValidator.validate(employee)

        assertEquals(setOf("EMPLOYEE_GIVEN_NAME_BLANK"), result.keys)
    }

    @Test
    fun validate_returnsError_whenSurnameIsBlank() {
        val employee = Employee(
            givenName = "John",
            surname = "",
            pensionInsuranceNumber = "12310199A904",
            taxIdentificationNumber = "18530459176",
            birthDate = LocalDate.parse("1990-01-01"),
            updatedAt = LocalDateTime.parse("2023-01-01T12:00:00")
        )

        val result = EmployeeValidator.validate(employee)

        assertEquals(setOf("EMPLOYEE_SURNAME_BLANK"), result.keys)
    }

    @Test
    fun validate_returnsError_whenPensionInsuranceNumberIsBlank() {
        val employee = Employee(
            givenName = "John",
            surname = "Doe",
            pensionInsuranceNumber = "",
            taxIdentificationNumber = "27111215956",
            birthDate = LocalDate.parse("1990-01-01"),
            updatedAt = LocalDateTime.parse("2023-01-01T12:00:00")
        )

        val result = EmployeeValidator.validate(employee)

        assertEquals(setOf("PENSION_INSURANCE_NUMBER_BLANK"), result.keys)
    }

    @Test
    fun validate_returnsError_whenTaxIdentificationNumberIsBlank() {
        val employee = Employee(
            givenName = "John",
            surname = "Doe",
            pensionInsuranceNumber = "12310199A904",
            taxIdentificationNumber = "",
            birthDate = LocalDate.parse("1990-01-01"),
            updatedAt = LocalDateTime.parse("2023-01-01T12:00:00")
        )

        val result = EmployeeValidator.validate(employee)

        assertEquals(setOf("EMPLOYEE_TIN_BLANK"), result.keys)
    }

    @Test
    fun validate_returnsMultipleErrors_whenMultipleFieldsAreInvalid() {
        val employee = Employee(
            givenName = "",
            surname = "",
            pensionInsuranceNumber = "",
            taxIdentificationNumber = "",
            birthDate = LocalDate.parse("1990-01-01"),
            updatedAt = LocalDateTime.parse("2023-01-01T12:00:00")
        )

        val result = EmployeeValidator.validate(employee)

        assertEquals(
            setOf(
                "EMPLOYEE_GIVEN_NAME_BLANK",
                "EMPLOYEE_SURNAME_BLANK",
                "PENSION_INSURANCE_NUMBER_BLANK",
                "EMPLOYEE_TIN_BLANK"
            ),
            result.keys
        )
    }

}