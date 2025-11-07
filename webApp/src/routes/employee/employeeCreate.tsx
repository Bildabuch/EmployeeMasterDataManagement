import {RouteObject} from "react-router-dom";
import {EmployeeCreationPage} from "../../pages";

export const employeeCreate: RouteObject = {
    path: "create",
    element: <EmployeeCreationPage/>,
    handle: {
        crumb: () => {
            return {
                label: "Anlegen",
                to: `/employee/create`,
            }
        }
    },
}