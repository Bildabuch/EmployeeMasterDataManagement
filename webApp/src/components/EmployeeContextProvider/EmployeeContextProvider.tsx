import type {PropsWithChildren, ReactElement} from 'react';
import {EmployeeContext} from "./EmployeeContext.ts";
import {useLoaderData} from "react-router-dom";
import {Employee} from "../../models";

/**
 * EmployeeContextProvider
 *
 * A wrapper component that provides the employee loaded by the route to its children.
 *
 * @param {PropsWithChildren} props - Standard React props containing `children`.
 * @returns {ReactElement} A context provider that supplies the loaded employee to descendants.
 *
 * Implementation details:
 * - `useLoaderData<Employee | undefined>()` reads the value provided by the route's loader.
 * - The obtained `employee` (which may be `undefined`) is passed as the context value.
 */
export const EmployeeContextProvider = (props: PropsWithChildren): ReactElement => {
    const {children} = props;
    const employee = useLoaderData<Employee | undefined>();

    return <EmployeeContext.Provider value={employee}>
        {children}
    </EmployeeContext.Provider>
};
