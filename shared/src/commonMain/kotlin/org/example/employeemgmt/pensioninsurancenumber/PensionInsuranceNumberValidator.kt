package org.example.employeemgmt.pensioninsurancenumber

import kotlinx.datetime.LocalDate
import org.example.employeemgmt.pensioninsurancenumber.validationExceptions.PensionInsuranceNumberInvalidBirthdateException
import org.example.employeemgmt.pensioninsurancenumber.validationExceptions.PensionInsuranceNumberInvalidControlDigitException

object PensionInsuranceNumberValidator {
    const val YEAR_BASE_20TH_CENTURY = 1900
    const val YEAR_BASE_21ST_CENTURY = 2000

    fun validate(pensionInsuranceNumber: PensionInsuranceNumber): Result<Unit> {
        if (!isDateValid(pensionInsuranceNumber)) {
            return Result.failure(PensionInsuranceNumberInvalidBirthdateException(pensionInsuranceNumber.toString()))
        }
        if (!isControlDigitValid(pensionInsuranceNumber)) {
            return Result.failure(PensionInsuranceNumberInvalidControlDigitException(pensionInsuranceNumber.toString()))
        }
        return Result.success(Unit)
    }

    private fun isControlDigitValid(pensionInsuranceNumber: PensionInsuranceNumber): Boolean {
        val controlDigit = PensionInsuranceNumberControlDigitDeterminer.determine(pensionInsuranceNumber)
        if (controlDigit.isFailure) {
            return false
        }
        return controlDigit.getOrNull()?.equals(pensionInsuranceNumber.controlDigit) ?: false
    }

    private fun isDateValid(pensionInsuranceNumber: PensionInsuranceNumber): Boolean {
        val day = pensionInsuranceNumber.day
        val month = pensionInsuranceNumber.month
        val yearShort = pensionInsuranceNumber.yearShort
        val possibleYears = listOf(YEAR_BASE_20TH_CENTURY + yearShort, YEAR_BASE_21ST_CENTURY + yearShort)

        return possibleYears.any { year ->
            try {
                LocalDate(year, month, day)
                true
            } catch (_: IllegalArgumentException) {
                false
            }
        }
    }
}
