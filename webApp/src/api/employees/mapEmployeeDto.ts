import type {EmployeeDto} from "shared";
import {Employee} from "../../models";
import dayjs from "dayjs";

/**
 * Maps an `EmployeeDto` object to an `Employee` object.
 *
 * This function transforms a data transfer object (DTO) representing an employee
 * into the application's internal `Employee` model. It ensures proper handling
 * of optional fields and converts date strings to `dayjs` objects.
 *
 * @param {EmployeeDto} employeeDto - The data transfer object containing employee data.
 * @returns {Employee} The mapped `Employee` object.
 */
export function mapEmployeeDto(employeeDto: EmployeeDto): Employee {
    return {
        id: employeeDto.id ?? undefined,
        givenName: employeeDto.givenName,
        surname: employeeDto.surname,
        birthDate: dayjs(employeeDto.birthDate),
        pensionInsuranceNumber: employeeDto.pensionInsuranceNumber,
        taxIdentificationNumber: employeeDto.taxIdentificationNumber,
        version: employeeDto.version ?? undefined,
        updatedAt: employeeDto.updatedAt ? dayjs(employeeDto.updatedAt) : undefined,
    }
}