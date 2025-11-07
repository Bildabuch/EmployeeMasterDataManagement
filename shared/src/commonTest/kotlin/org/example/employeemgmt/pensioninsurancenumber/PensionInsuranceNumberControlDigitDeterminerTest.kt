package org.example.employeemgmt.pensioninsurancenumber

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

class PensionInsuranceNumberControlDigitDeterminerTest {
    @Test
    fun determine_returnsControlDigit_whenValidPensionInsuranceNumber() {
        val pensionInsuranceNumber = PensionInsuranceNumber(
            institutionAreaCode = 12,
            day = 1,
            month = 1,
            yearShort = 1,
            initialLetter = "A",
            serialNumber = "12",
            controlDigit = 6
        )

        val result = PensionInsuranceNumberControlDigitDeterminer.determine(pensionInsuranceNumber)

        assertEquals(6, result.getOrThrow())
    }

    @Test
    fun determine_throwsException_whenInitialLetterIsInvalid() {
        val pensionInsuranceNumber = PensionInsuranceNumber(
            institutionAreaCode = 12,
            day = 1,
            month = 1,
            yearShort = 1,
            initialLetter = "1",
            serialNumber = "12",
            controlDigit = 4
        )

        val result = PensionInsuranceNumberControlDigitDeterminer.determine(pensionInsuranceNumber)

        assertFailsWith<IllegalArgumentException> { result.getOrThrow() }
    }

    @Test
    fun determine_throwsException_whenPensionInsuranceNumberIsTooShort() {
        val pensionInsuranceNumber = PensionInsuranceNumber(
            institutionAreaCode = 12,
            day = 1,
            month = 1,
            yearShort = 1,
            initialLetter = "A",
            serialNumber = "1",
            controlDigit = 4
        )

        val result = PensionInsuranceNumberControlDigitDeterminer.determine(pensionInsuranceNumber)

        assertFailsWith<IllegalArgumentException> { result.getOrThrow() }
    }

    @Test
    fun determine_returnsControlDigit_whenInitialLetterIsLowercase() {
        val pensionInsuranceNumber = PensionInsuranceNumber(
            institutionAreaCode = 12,
            day = 1,
            month = 1,
            yearShort = 1,
            initialLetter = "a",
            serialNumber = "12",
            controlDigit = 6
        )

        val result = PensionInsuranceNumberControlDigitDeterminer.determine(pensionInsuranceNumber)

        assertEquals(6, result.getOrThrow())
    }
}