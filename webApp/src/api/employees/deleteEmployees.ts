import {baseUrl} from "../baseUrl.ts";
import {ResponseObject} from "../ResponseObject.ts";
import {EmployeeDeletionResponseDto} from "shared";
import {create500ResponseObject} from "../create500ResponseObject.ts";
import {createResponseObject} from "../createResponseObject.ts";

export const deleteEmployees = async (employeeIds: string[]):
    Promise<ResponseObject<EmployeeDeletionResponseDto>> => {
    try {
        const response = await fetch(`${baseUrl}/employees/delete-multiple`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeIds)
        })
        return createResponseObject(response)
    } catch (error) {
        console.error("Error deleting employees:", error);
        return create500ResponseObject();
    }
}