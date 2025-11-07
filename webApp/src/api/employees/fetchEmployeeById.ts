import {createResponseObject} from "../createResponseObject.ts";
import {ResponseObject} from "../ResponseObject.ts";
import {create500ResponseObject} from "../create500ResponseObject.ts";
import {Employee} from "../../models";
import {mapEmployeeDto} from "./mapEmployeeDto.ts";

export const fetchEmployeeById = async (id: string): Promise<ResponseObject<Employee>> => {
    try {
        const response = await fetch(`http://localhost:8080/employees/${encodeURIComponent(id)}`)
        return createResponseObject(response, mapEmployeeDto)
    } catch (error) {
        console.error("Error to fetch employee:", error);
        return create500ResponseObject()
    }
}