package org.example.employeemgmt

import kotlinx.datetime.*
import org.example.employeemgmt.i18n.LabelService
import org.example.employeemgmt.pensioninsurancenumber.PensionInsuranceNumberParser
import org.example.employeemgmt.pensioninsurancenumber.PensionInsuranceNumberValidator
import org.example.employeemgmt.taxidentificationnumber.TaxIdentificationNumberValidator

object EmployeeValidator {
    private const val MIN_AGE = 18

    fun validate(employee: Employee): Map<String, String> {
        val labelService = LabelService("de")
        val errors = mutableListOf<String>()

        if (employee.givenName.isBlank()) errors.add(EmployeeValidationErrorKeys.EMPLOYEE_GIVEN_NAME_BLANK.name)
        if (employee.surname.isBlank()) errors.add(EmployeeValidationErrorKeys.EMPLOYEE_SURNAME_BLANK.name)
        validateBirthDate(employee.birthDate)
            .onFailure { error ->
                errors.add(
                    (error as? EmployeeValidationException)?.errorKey
                        ?: EmployeeValidationErrorKeys.EMPLOYEE_BIRTH_DATE_INVALID_UNKNOWN_ERROR.name
                )
            }

        validatePensionInsuranceNumber(employee.pensionInsuranceNumber)
            .onFailure { error ->
                errors.add(
                    (error as? EmployeeValidationException)?.errorKey
                        ?: EmployeeValidationErrorKeys.PENSION_INSURANCE_NUMBER_INVALID_UNKNOWN_ERROR.name
                )
            }

        validateTaxIdentificationNumber(employee.taxIdentificationNumber)
            .onFailure { error ->
                errors.add(
                    (error as? EmployeeValidationException)?.errorKey
                        ?: EmployeeValidationErrorKeys.TAX_IDENTIFICATION_NUMBER_INVALID.name
                )
            }

        return errors.associateWith { labelService.translate(it) }
    }

    private fun validateBirthDate(birthDate: LocalDate): Result<Unit> {
        val today = determineTodayDate()
        if (birthDate >= today) {
            return Result.failure(EmployeeValidationException(EmployeeValidationErrorKeys.EMPLOYEE_BIRTH_DATE_IN_FUTURE.name))
        }
        val earliestDateOfBirth = today.minus(DatePeriod(years = MIN_AGE))
        if (birthDate.daysUntil(earliestDateOfBirth) < 0) {
            return Result.failure(EmployeeValidationException(EmployeeValidationErrorKeys.EMPLOYEE_BIRTH_DATE_UNDERAGE.name))
        }
        if (birthDate.year < 1900) {
            return Result.failure(EmployeeValidationException(EmployeeValidationErrorKeys.EMPLOYEE_BIRTH_DATE_INVALID_UNKNOWN_ERROR.name))
        }
        return Result.success(Unit)
    }

    private fun determineTodayDate(): LocalDate {
        return Clock.System.now()
            .toLocalDateTime(TimeZone.currentSystemDefault())
            .date
    }

    fun validateTaxIdentificationNumber(taxIdentificationNumber: String): Result<Unit> {
        if (taxIdentificationNumber.isBlank()) return Result.failure(
            EmployeeValidationException(
                EmployeeValidationErrorKeys.EMPLOYEE_TIN_BLANK.name
            )
        )
        if (TaxIdentificationNumberValidator.isValid(taxIdentificationNumber)) {
            return Result.success(Unit)
        }
        return Result.failure(EmployeeValidationException(EmployeeValidationErrorKeys.TAX_IDENTIFICATION_NUMBER_INVALID.name))
    }

    fun validatePensionInsuranceNumber(pensionInsuranceNumber: String): Result<Unit> {
        return PensionInsuranceNumberParser.parse(pensionInsuranceNumber)
            .fold(
                onSuccess = { PensionInsuranceNumberValidator.validate(it) },
                onFailure = { Result.failure(it) }
            )
            .fold(
                onSuccess = { Result.success(Unit) },
                onFailure = { ex ->
                    Result.failure(
                        if (ex is EmployeeValidationException) ex
                        else EmployeeValidationException(EmployeeValidationErrorKeys.PENSION_INSURANCE_NUMBER_INVALID_UNKNOWN_ERROR.name)
                    )
                }
            )
    }

}
