import {Dayjs} from "dayjs";

/**
 * Represents a historical record of an employee, including personal details
 * and metadata about the record's creation.
 *
 * @property {string} id - The unique identifier of the history entry.
 * @property {string} employeeId - The unique identifier of the associated employee.
 * @property {string} givenName - The first name of the employee.
 * @property {string} surname - The last name of the employee.
 * @property {Dayjs} birthDate - The birth date of the employee as a Dayjs object.
 * @property {string} pensionInsuranceNumber - The employee's pension insurance number.
 * @property {string} taxIdentificationNumber - The employee's tax identification number.
 * @property {string} version - The version of the history entry.
 * @property {Dayjs} createdAt - The timestamp when the history entry was created.
 */
export interface EmployeeHistoryEntry {
    id: string;
    employeeId: string;
    givenName: string;
    surname: string;
    birthDate: Dayjs;
    pensionInsuranceNumber: string;
    taxIdentificationNumber: string;
    version: string;
    createdAt: Dayjs;
}