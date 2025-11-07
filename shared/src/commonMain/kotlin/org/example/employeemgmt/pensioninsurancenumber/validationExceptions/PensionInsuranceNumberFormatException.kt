package org.example.employeemgmt.pensioninsurancenumber.validationExceptions

import org.example.employeemgmt.EmployeeValidationErrorKeys
import org.example.employeemgmt.EmployeeValidationException

class PensionInsuranceNumberFormatException(pensionInsuranceNumber: String) :
    EmployeeValidationException(
        EmployeeValidationErrorKeys.PENSION_INSURANCE_NUMBER_FORMAT_INVALID.name,
        "Invalid format for Pension Insurance Number. Expected format is 'IIDDMMYYLSCD' but was '$pensionInsuranceNumber'."
    ) {
}