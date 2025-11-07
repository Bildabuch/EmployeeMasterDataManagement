import {EmployeeValidationErrors} from "./validateEmployee.ts";
import {Employee} from "../../models";
import {mapErrorKeyValue} from "./mapErrorKeyValue.ts";

/**
 * Transforms an error object into a structured `EmployeeValidationErrors` object.
 *
 * This function takes an optional error object, where keys represent error codes
 * and values represent error messages, and maps them to the corresponding fields
 * in the `Employee` model. The resulting object groups error messages by field.
 *
 * @param {Record<string, string> | undefined} errorObject - The error object to transform.
 *        If undefined, an empty `EmployeeValidationErrors` object is returned.
 *
 * @returns {EmployeeValidationErrors} A structured object containing validation errors
 *          grouped by the fields of the `Employee` model.
 */
export function transformErrorObject(errorObject?: Record<string, string>): EmployeeValidationErrors {
    if (!errorObject) {
        return {} as EmployeeValidationErrors;
    }
    const errorFormObject: EmployeeValidationErrors = {} as EmployeeValidationErrors;

    /**
     * Adds an error message to the specified field in the `errorFormObject`.
     *
     * @param {keyof Employee} field - The field to which the error message belongs.
     * @param {string} message - The error message to add.
     */
    const addError = (field: keyof Employee, message: string) => {
        if (!errorFormObject[field]) {
            errorFormObject[field] = [];
        }
        errorFormObject[field].push(message);
    };

    Object.keys(errorObject).forEach((key: string) =>
        mapErrorKeyValue(key, errorObject[key], addError));
    return errorFormObject;
}