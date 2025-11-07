import {Employee} from "../models";

/**
 * useEmployeeName
 *
 * A custom hook that returns the full name of an employee or a fallback string
 * if the employee object is not provided.
 *
 * @param {Employee} [employee] - The employee object containing `givenName` and `surname`.
 * @param {string} [fallback="Mitarbeiter nicht gefunden"] - The fallback string to return
 * if the employee object is undefined.
 * @returns {string} The full name of the employee or the fallback string.
 */
export const determineEmployeeName = (employee?: Employee, fallback: string = "Mitarbeiter nicht gefunden"): string => {
    return employee ? `${employee.givenName} ${employee.surname}` : fallback;
}