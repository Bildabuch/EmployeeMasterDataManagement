import {RouteObject} from "react-router-dom";
import {EmployeeListPage} from "../pages";
import {fetchAllEmployees} from "../api/employees";

export const employeesRoutes: RouteObject[] = [
    {
        path: "employees",
        loader: async () => {
            const response = await fetchAllEmployees()
            return response.error ? [] : response.data
        },
        handle: {crumb: () => ({label: "Mitarbeiter", to: "/employees"})},
        element: <EmployeeListPage/>,
    },
];
