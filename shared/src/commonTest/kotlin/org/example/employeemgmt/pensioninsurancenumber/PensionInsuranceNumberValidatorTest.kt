package org.example.employeemgmt.pensioninsurancenumber

import org.example.employeemgmt.pensioninsurancenumber.validationExceptions.PensionInsuranceNumberInvalidBirthdateException
import org.example.employeemgmt.pensioninsurancenumber.validationExceptions.PensionInsuranceNumberInvalidControlDigitException
import kotlin.test.Test
import kotlin.test.assertTrue

class PensionInsuranceNumberValidatorTest {
    @Test
    fun validate_doesNotThrow_whenPensionInsuranceNumberIsValid() {
        val pensionInsuranceNumber = PensionInsuranceNumber(
            institutionAreaCode = 12,
            day = 1,
            month = 1,
            yearShort = 1,
            initialLetter = "A",
            serialNumber = "12",
            controlDigit = 6
        )

        assertTrue { PensionInsuranceNumberValidator.validate(pensionInsuranceNumber).isSuccess }
    }

    @Test
    fun validate_throwsException_whenBirthdateIsInvalid() {
        val pensionInsuranceNumber = PensionInsuranceNumber(
            institutionAreaCode = 12,
            day = 32,
            month = 1,
            yearShort = 1,
            initialLetter = "33A",
            serialNumber = "12",
            controlDigit = 4
        )

        val result = PensionInsuranceNumberValidator.validate(pensionInsuranceNumber)
        assertTrue { result.isFailure }
        assertTrue { result.exceptionOrNull() is PensionInsuranceNumberInvalidBirthdateException }
    }

    @Test
    fun validate_throwsException_whenControlDigitIsInvalid() {
        val pensionInsuranceNumber = PensionInsuranceNumber(
            institutionAreaCode = 12,
            day = 1,
            month = 1,
            yearShort = 1,
            initialLetter = "A",
            serialNumber = "12",
            controlDigit = 3
        )
        val result = PensionInsuranceNumberValidator.validate(pensionInsuranceNumber)
        assertTrue { result.isFailure }
        assertTrue { result.exceptionOrNull() is PensionInsuranceNumberInvalidControlDigitException }
    }

    @Test
    fun validate_doesNotThrow_whenYearIsFrom20thCentury() {
        val pensionInsuranceNumber = PensionInsuranceNumber(
            institutionAreaCode = 12,
            day = 1,
            month = 1,
            yearShort = 99,
            initialLetter = "A",
            serialNumber = "12",
            controlDigit = 3
        )

        assertTrue { PensionInsuranceNumberValidator.validate(pensionInsuranceNumber).isSuccess }
    }

    @Test
    fun validate_doesNotThrow_whenYearIsFrom21stCentury() {
        val pensionInsuranceNumber = PensionInsuranceNumber(
            institutionAreaCode = 12,
            day = 1,
            month = 1,
            yearShort = 1,
            initialLetter = "A",
            serialNumber = "12",
            controlDigit = 6
        )

        assertTrue { PensionInsuranceNumberValidator.validate(pensionInsuranceNumber).isSuccess }
    }

}