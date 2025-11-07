package org.example.employeemgmt.pensioninsurancenumber.validationExceptions

import org.example.employeemgmt.EmployeeValidationErrorKeys
import org.example.employeemgmt.EmployeeValidationException

class PensionInsuranceNumberInvalidControlDigitException(pensionInsuranceNumber: String) :
    EmployeeValidationException(
        EmployeeValidationErrorKeys.PENSION_INSURANCE_NUMBER_CONTROL_DIGIT_INVALID.name,
        "Invalid control digit in Pension Insurance Number. The control digit of the Pension Insurance Number '$pensionInsuranceNumber' is incorrect."
    ) {
}