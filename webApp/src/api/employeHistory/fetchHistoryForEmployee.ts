import {baseUrl} from "../baseUrl.ts";
import {type EmployeeHistoryEntry} from "../../models";

/**
 * Fetches the history of an employee based on their ID.
 *
 * This function sends a GET request to the API to retrieve the history
 * of an employee. If the request is successful (HTTP status 200), the
 * function returns the parsed JSON data as an array of `EmployeeHistoryEntry`.
 * If the request fails, it logs an error message and returns an empty array.
 *
 * @param {string} employeeId - The unique identifier of the employee.
 * @returns {Promise<EmployeeHistoryEntry[]>} A promise resolving to an array of `EmployeeHistoryEntry`:
 * - On success: Contains the employee history data.
 * - On failure: Returns an empty array.
 */
export const fetchHistoryForEmployee = async (employeeId: string): Promise<EmployeeHistoryEntry[]> => {
    const result = await fetch(`${baseUrl}/employee-versions/${encodeURIComponent(employeeId)}`);
    if (result.ok) {
        return result.json();
    } else {
        console.error("Error fetching employee history:", result.statusText);
        return [];
    }
}