import {Navigate, RouteObject} from "react-router-dom";
import {employeeDetail} from "./employeeDetail.tsx";
import {employeeCreate} from "./employeeCreate.tsx";

export const employeeRoutes: RouteObject[] = [
    {
        path: "employee",
        handle: {
            crumb: () => {
                return {
                    label: "Mitarbeiter",
                    to: `/employees`,
                }
            }
        },
        children: [
            {
                index: true,
                element: <Navigate to="/employees" replace/>,
            },
            employeeDetail,
            employeeCreate
        ],
    },
];
