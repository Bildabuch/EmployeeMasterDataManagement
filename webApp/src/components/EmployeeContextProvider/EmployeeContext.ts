import {Context, createContext} from "react";
import {Employee} from "../../models";

/**
 * EmployeeContext
 *
 * A React context to provide the current employee data throughout the component tree.
 *
 * @type {Context<Employee | undefined>}
 * - The context value is of type `Employee | undefined`.
 * - Initially, the context is set to `undefined`.
 *
 * Usage:
 * - Use `EmployeeContext.Provider` to supply an `Employee` object to descendant components.
 * - Use `useContext(EmployeeContext)` to consume the context value in child components.
 *
 * Notes:
 * - Ensure that the provider wraps all components that need access to the employee data.
 * - Consumers should handle the possibility of an `undefined` value.
 */
export const EmployeeContext: Context<Employee | undefined> = createContext<Employee | undefined>(undefined)