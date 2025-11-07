import {Employee} from "../../models";
import {EmployeeValidationErrors} from "./validateEmployee.ts";
import {mapErrorKeyValue} from "./mapErrorKeyValue.ts";

/**
 * Transforms a map of validation errors into the EmployeeValidationErrors format.
 *
 * @param {Map<string, string>} errorMap - A map where the keys are error keys and the values are error messages.
 * @returns {EmployeeValidationErrors} The transformed validation errors.
 * @throws {Error} If an unknown validation error key is encountered.
 */
export function transformErrorMap(errorMap: Map<string, string>): EmployeeValidationErrors {
    if (!errorMap) {
        return {} as EmployeeValidationErrors;
    }
    const errorFormObject: EmployeeValidationErrors = {} as EmployeeValidationErrors;

    /**
     * Helper to initialize the array for a field and push the error message.
     *
     * @param {keyof Employee} field - The Employee field to add the error to.
     * @param {string} message - The error message to add.
     */
    const addError = (field: keyof Employee, message: string) => {
        if (!errorFormObject[field]) {
            errorFormObject[field] = [];
        }
        errorFormObject[field].push(message);
    };

    errorMap.forEach((errorMessage: string, key: string) =>
        mapErrorKeyValue(key, errorMessage, addError));
    return errorFormObject;
}