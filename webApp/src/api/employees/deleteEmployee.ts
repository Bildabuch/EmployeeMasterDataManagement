import {baseUrl} from "../baseUrl.ts";
import {ResponseObject} from "../ResponseObject.ts";
import {EmployeeDeletionResponseDto} from "shared";
import {create500ResponseObject} from "../create500ResponseObject.ts";
import {createResponseObject} from "../createResponseObject.ts";

export const deleteEmployee = async (employeeId: string):
    Promise<ResponseObject<EmployeeDeletionResponseDto>> => {
    try {

        const response = await fetch(`${baseUrl}/employees/${encodeURIComponent(employeeId)}`, {
            method: 'DELETE'
        })
        return createResponseObject(response)
    } catch (error) {
        console.error("Error deleting employee:", error);
        return create500ResponseObject();
    }
}