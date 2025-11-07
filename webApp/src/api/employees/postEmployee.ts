import {EmployeeCreationResponseDto, EmployeeDto} from "shared"
import {Employee} from "../../models";
import {baseUrl} from "../baseUrl.ts";
import {createResponseObject} from "../createResponseObject.ts";
import {ResponseObject} from "../ResponseObject.ts";
import {create500ResponseObject} from "../create500ResponseObject.ts";

export const postEmployee = async (employee: Employee):
    Promise<ResponseObject<EmployeeCreationResponseDto>> => {
    try {
        const employeeDto = new EmployeeDto(
            null,
            employee.givenName,
            employee.surname,
            employee.birthDate.format("YYYY-MM-DD"),
            employee.pensionInsuranceNumber,
            employee.taxIdentificationNumber,
            null,
            null
        )

        const response = await fetch(`${baseUrl}/employees/`, {
            method: 'POST',
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