package org.example.employeemgmt.pensioninsurancenumber

import org.example.employeemgmt.EmployeeValidationException
import org.example.employeemgmt.pensioninsurancenumber.validationExceptions.PensionInsuranceNumberFormatException
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class PensionInsuranceNumberParserTest {

    @Test
    fun parse_returnsPensionInsuranceNumber_whenValidInput() {
        val result = PensionInsuranceNumberParser.parse("12310199A904").getOrThrow()

        assertEquals(12, result.institutionAreaCode)
        assertEquals(31, result.day)
        assertEquals(1, result.month)
        assertEquals(99, result.yearShort)
        assertEquals("A", result.initialLetter)
        assertEquals("90", result.serialNumber)
        assertEquals(4, result.controlDigit)
    }

    @Test
    fun parse_throwsException_whenInputDoesNotMatchPattern() {
        val result = PensionInsuranceNumberParser.parse("invalid")
        assertTrue { result.isFailure }
        assertTrue { result.exceptionOrNull() is PensionInsuranceNumberFormatException }
    }

    @Test
    fun parse_throwsException_whenInputIsEmpty() {
        val result = PensionInsuranceNumberParser.parse("")
        assertTrue { result.isFailure }
        assertTrue { result.exceptionOrNull() is EmployeeValidationException }
    }

    @Test
    fun parse_throwsException_whenControlDigitIsMissing() {
        val result = PensionInsuranceNumberParser.parse("12310199A90")
        assertTrue { result.isFailure }
        assertTrue { result.exceptionOrNull() is PensionInsuranceNumberFormatException }
    }

    @Test
    fun parse_throwsException_whenBirthdateIsInvalid() {
        val result = PensionInsuranceNumberParser.parse("12320199A904")
        assertTrue { result.isFailure }
        assertTrue { result.exceptionOrNull() is PensionInsuranceNumberFormatException }
    }

}