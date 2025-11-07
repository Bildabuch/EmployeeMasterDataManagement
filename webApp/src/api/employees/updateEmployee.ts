import {EmployeeDto, EmployeeUpdateResponseDto} from "shared"
import {Employee} from "../../models";
import {baseUrl} from "../baseUrl.ts";
import {createResponseObject} from "../createResponseObject.ts";
import {ResponseObject} from "../ResponseObject.ts";
import {create500ResponseObject} from "../create500ResponseObject.ts";

export const updateEmployee = async (employee: Employee):
    Promise<ResponseObject<EmployeeUpdateResponseDto>> => {
    try {
        const employeeDto = new EmployeeDto(
            employee.id ?? null,
            employee.givenName,
            employee.surname,
            employee.birthDate.format("YYYY-MM-DD"),
            employee.pensionInsuranceNumber,
            employee.taxIdentificationNumber,
            employee.version ?? null,
            null
        )

        const response = await fetch(`${baseUrl}/employees/${encodeURIComponent(employee.id!)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeDto)
        })
        return createResponseObject(response);
    } catch (error) {
        console.error("Error fetching employees:", error);
        return create500ResponseObject()
    }
}