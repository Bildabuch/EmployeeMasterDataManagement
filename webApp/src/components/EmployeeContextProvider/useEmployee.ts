import {useContext} from "react";
import {EmployeeContext} from "./EmployeeContext.ts";
import {Employee} from "../../models";

/**
 * Custom hook to access the current employee from the EmployeeContext.
 *
 * This hook provides the employee data stored in the EmployeeContext.
 * If the context is not available, it returns `undefined`.
 *
 * @returns {Employee | undefined} The current employee object or `undefined` if the context is not available.
 */
export const useEmployee = (): Employee | undefined => {
    return useContext(EmployeeContext)
}