package org.example.employeemgmt.pensioninsurancenumber

import org.example.employeemgmt.EmployeeValidationErrorKeys
import org.example.employeemgmt.EmployeeValidationException
import org.example.employeemgmt.pensioninsurancenumber.validationExceptions.PensionInsuranceNumberFormatException

object PensionInsuranceNumberParser {
    val PENSION_INSURANCE_NUMBER_PATTERN = Regex(
        "^" +
                "(\\d{2})" +                // Group 1: Institution area code
                "(0[1-9]|[12][0-9]|3[01])" +// Group 2: Birthdate (day)
                "(0[1-9]|1[0-2])" +         // Group 3: Birthdate (month)
                "(\\d{2})" +                // Group 4: Birthdate (short year)
                "([A-Z])" +                 // Group 5: Initial letter
                "(\\d{2})" +                // Group 6: Serial number
                "(\\d)" +                   // Group 7: Control digit
                "$"
    )

    fun parse(pensionInsuranceNumber: String): Result<PensionInsuranceNumber> = runCatching {
        if (pensionInsuranceNumber.isBlank())
            throw EmployeeValidationException(EmployeeValidationErrorKeys.PENSION_INSURANCE_NUMBER_BLANK.name)

        val match = PENSION_INSURANCE_NUMBER_PATTERN.matchEntire(pensionInsuranceNumber.uppercase())
            ?: throw PensionInsuranceNumberFormatException(pensionInsuranceNumber)

        PensionInsuranceNumber(
            institutionAreaCode = match.groupValues[1].toInt(),
            day = match.groupValues[2].toInt(),
            month = match.groupValues[3].toInt(),
            yearShort = match.groupValues[4].toInt(),
            initialLetter = match.groupValues[5],
            serialNumber = match.groupValues[6],
            controlDigit = match.groupValues[7].toInt()
        )
    }
}