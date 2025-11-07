import {Employee} from "../../models";
import {mapEmployeeDto} from "./mapEmployeeDto.ts";
import {ResponseObject} from "../ResponseObject.ts";
import {createResponseObject} from "../createResponseObject.ts";
import {EmployeeDto} from "shared";
import {create500ResponseObject} from "../create500ResponseObject.ts";
import {baseUrl} from "../baseUrl.ts";

export const fetchAllEmployees = async (): Promise<ResponseObject<Employee[]>> => {
    try {
        const response = await fetch(`${baseUrl}/employees/`)
        return createResponseObject(response, (dtos: EmployeeDto[]) => dtos.map(mapEmployeeDto));
    } catch (error) {
        console.error("Error fetching employees:", error);
        return create500ResponseObject()
    }
}