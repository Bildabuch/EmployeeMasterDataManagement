import {RouteObject, UIMatch} from "react-router-dom";
import {EmployeeDto} from "shared";
import {EmployeeEditPage} from "../../pages";

export const employeeEditRoute: RouteObject = {
    path: "edit",
    handle: {
        crumb: (match: UIMatch<EmployeeDto | undefined>) => ({
            label: "Bearbeiten",
            to: `/employee/${match.params.employeeId}/edit`,
        })
    },
    element: <EmployeeEditPage/>,
};