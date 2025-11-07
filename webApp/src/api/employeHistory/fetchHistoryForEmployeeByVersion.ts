import {baseUrl} from "../baseUrl.ts";
import {type EmployeeHistoryEntry} from "../../models";
import {ResponseObject} from "../ResponseObject.ts";
import {createResponseObject} from "../createResponseObject.ts";

/**
 * Fetches the version history for a specific employee.
 *
 * This function sends a GET request to the API to retrieve the version history
 * of an employee based on their ID and the specified version. The response is
 * processed into a standardized `ResponseObject`.
 *
 * @param {string} employeeId - The unique identifier of the employee.
 * @param {string} version - The version identifier for the employee's history entry.
 * @returns {Promise<ResponseObject<EmployeeHistoryEntry>>} A promise resolving to a `ResponseObject`:
 * - On success: Contains the employee history entry data.
 * - On failure: Contains an error flag and status code.
 */
export const fetchHistoryForEmployeeByVersion = async (employeeId: string, version: string): Promise<ResponseObject<EmployeeHistoryEntry>> => {
    const response = await fetch(`${baseUrl}/employee-versions/${encodeURIComponent(employeeId)}/${encodeURIComponent(version)}`);
    return createResponseObject(response);
}