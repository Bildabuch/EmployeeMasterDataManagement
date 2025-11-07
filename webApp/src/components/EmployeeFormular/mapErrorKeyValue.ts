import {EmployeeValidationErrorKeys} from "shared";
import {Employee} from "../../models";

/**
 * Map a validation error key and value to a specific field and message in the `Employee` model.
 *
 * This function takes a validation error key and its corresponding value, determines the
 * appropriate field in the `Employee` model, and invokes the provided callback with the
 * mapped field and error message. If the key is unknown, an error is thrown.
 *
 * @param {string} key - The validation error key to map.
 * @param {string} value - The validation error message associated with the key.
 * @param {(field: keyof Employee, message: string) => void} onMappedValue - A callback function
 *        that is called with the mapped field and error message.
 *
 * @throws {Error} Throws an error if the validation error key is unknown.
 */
export function mapErrorKeyValue(key: string, value: string, onMappedValue: (field: keyof Employee, message: string) => void) {
    switch (key) {
        case EmployeeValidationErrorKeys.EMPLOYEE_GIVEN_NAME_BLANK.name:
            onMappedValue('givenName', value);
            break;
        case EmployeeValidationErrorKeys.EMPLOYEE_SURNAME_BLANK.name:
            onMappedValue('surname', value);
            break;
        case EmployeeValidationErrorKeys.EMPLOYEE_BIRTH_DATE_INVALID_UNKNOWN_ERROR.name:
        case EmployeeValidationErrorKeys.EMPLOYEE_BIRTH_DATE_IN_FUTURE.name:
        case EmployeeValidationErrorKeys.EMPLOYEE_BIRTH_DATE_UNDERAGE.name:
            onMappedValue('birthDate', value);
            break;
        case EmployeeValidationErrorKeys.PENSION_INSURANCE_NUMBER_BLANK.name:
        case EmployeeValidationErrorKeys.PENSION_INSURANCE_NUMBER_FORMAT_INVALID.name:
        case EmployeeValidationErrorKeys.PENSION_INSURANCE_NUMBER_BIRTHDATE_INVALID.name:
        case EmployeeValidationErrorKeys.PENSION_INSURANCE_NUMBER_CONTROL_DIGIT_INVALID.name:
        case EmployeeValidationErrorKeys.PENSION_INSURANCE_NUMBER_INVALID_UNKNOWN_ERROR.name:
            onMappedValue('pensionInsuranceNumber', value);
            break;
        case EmployeeValidationErrorKeys.TAX_IDENTIFICATION_NUMBER_INVALID.name:
        case EmployeeValidationErrorKeys.EMPLOYEE_TIN_BLANK.name:
            onMappedValue('taxIdentificationNumber', value);
            break;
        default:
            throw new Error(`Unknown validation error key: ${key}`);
    }
}