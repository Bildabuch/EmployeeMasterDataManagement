import {EmployeeVersionDto} from "shared";
import {EmployeeHistoryEntry} from "../../models";
import dayjs from "dayjs";

/**
 * Maps an `EmployeeDto` object to an `Employee` object.
 *
 * This function transforms a data transfer object (DTO) representing an employee
 * into the application's internal `Employee` model. It ensures proper handling
 * of optional fields and converts date strings to `dayjs` objects.
 *
 * @param {EmployeeVersionDto} employeeVersionDto - The data transfer object containing employee data.
 * @returns {Employee} The mapped `Employee` object.
 */
export function mapEmployeeHistoryDto(employeeVersionDto: EmployeeVersionDto): EmployeeHistoryEntry {
    return {
        id: employeeVersionDto.id,
        employeeId: employeeVersionDto.employeeId,
        givenName: employeeVersionDto.givenName,
        surname: employeeVersionDto.surname,
        birthDate: dayjs(employeeVersionDto.birthDate),
        pensionInsuranceNumber: employeeVersionDto.pensionInsuranceNumber,
        taxIdentificationNumber: employeeVersionDto.taxIdentificationNumber,
        version: employeeVersionDto.version ?? undefined,
        updatedAt: dayjs(employeeVersionDto.changedAt),
    }
}