import {Employee} from "../../models";
import {mapEmployeeDto} from "./mapEmployeeDto.ts";
import {ResponseObject} from "../ResponseObject.ts";
import {createResponseObject} from "../createResponseObject.ts";
import {EmployeeDto} from "shared";
import {create500ResponseObject} from "../create500ResponseObject.ts";

export const fetchAllEmployees = async (): Promise<ResponseObject<Employee[]>> => {
    try {
        const response = await fetch("http://localhost:8080/employees/")
        return createResponseObject(response, (dtos: EmployeeDto[]) => dtos.map(mapEmployeeDto));
    } catch (error) {
        console.error("Error fetching employees:", error);
        return create500ResponseObject()
    }
}