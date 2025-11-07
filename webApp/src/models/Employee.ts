import {Dayjs} from "dayjs";
/**
 * Represents an employee with personal and identification details.
 *
 * @property {string} [id] - The unique identifier of the employee (optional).
 * @property {string} givenName - The first name of the employee.
 * @property {string} surname - The last name of the employee.
 * @property {Dayjs} birthDate - The birth date of the employee as a Dayjs object.
 * @property {string} pensionInsuranceNumber - The employee's pension insurance number.
 * @property {string} taxIdentificationNumber - The employee's tax identification number.
 * @property {string} [version] - The version of the employee record (optional).
 * @property {Dayjs} [updatedAt] - The timestamp of the last update to the employee record (optional).
 */
export interface Employee {
    id?: string;
    givenName: string;
    surname: string;
    birthDate: Dayjs;
    pensionInsuranceNumber: string;
    taxIdentificationNumber: string;
    version?: string;
    updatedAt?: Dayjs;
}