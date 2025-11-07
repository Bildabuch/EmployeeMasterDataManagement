import {EmployeeDto, EmployeeValidatorService} from "shared";
import {Employee} from "../../models";
import {transformErrorMap} from "./transformErrorMap.ts";

/**
 * Represents the validation errors for an Employee object.
 * The keys correspond to the properties of the Employee model,
 * and the values are arrays of error messages for each property.
 */
export type EmployeeValidationErrors = Record<keyof Employee, string[]>;

/**
 * Validates an Employee object and returns a map of validation errors.
 *
 * @param {Employee} employee - The Employee object to validate.
 * @returns {EmployeeValidationErrors} A map of validation errors, where the keys are
 * the Employee properties and the values are arrays of error messages.
 */
export const validateEmployee = (employee: Employee): EmployeeValidationErrors => {
    const employeeDto = new EmployeeDto(
        null,
        employee.givenName,
        employee.surname,
        employee.birthDate.format('YYYY-MM-DD'),
        employee.pensionInsuranceNumber,
        employee.taxIdentificationNumber,
        null,
        null
    )
    const errorMap = EmployeeValidatorService.getInstance().validate(employeeDto);

    return transformErrorMap(errorMap);
}
