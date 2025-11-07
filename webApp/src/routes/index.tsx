import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import {employeesRoutes} from "./employees";
import {MainFrame} from "../components/MainFrame/MainFrame";
import {employeeRoutes} from "./employee";

const baseRoutes: RouteObject[] = [
    {
        path: "/",
        element: <MainFrame/>,
        children: [
            {
                index: true,
                element: <Navigate to="/employees" replace/>,
            },
            ...employeesRoutes,
            ...employeeRoutes,
        ],
    },
];

export const router = createBrowserRouter(baseRoutes);
