package org.example.employeemgmt.pensioninsurancenumber.validationExceptions

import org.example.employeemgmt.EmployeeValidationErrorKeys
import org.example.employeemgmt.EmployeeValidationException

class PensionInsuranceNumberInvalidBirthdateException(pensionInsuranceNumber: String) :
    EmployeeValidationException(
        EmployeeValidationErrorKeys.PENSION_INSURANCE_NUMBER_BIRTHDATE_INVALID.name,
        "Invalid birthdate in Pension Insurance Number. The birthdate part of the Pension Insurance Number '$pensionInsuranceNumber' does not represent a valid date."
    ) {
}