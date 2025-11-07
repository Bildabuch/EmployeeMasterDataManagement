import {Outlet, RouteObject, UIMatch} from "react-router-dom";
import {fetchEmployeeById} from "../../api/employees";
import {EmployeeDto} from "shared";
import {EmployeeContextProvider} from "../../components/EmployeeContextProvider";
import {EmployeeDetailPage} from "../../pages";
import {employeeEditRoute} from "./employeeEdit.tsx";
import {employeeHistoryRoute} from "./employeeHistory.tsx";

export const employeeDetail: RouteObject = {
    path: ":employeeId",
    loader: async ({params}) => {
        const response = await fetchEmployeeById(params.employeeId!)
        return response.error ? undefined : response.data
    },
    handle: {
        crumb: (match: UIMatch<EmployeeDto | undefined>) => {
            const employee = match.loaderData;
            const label = employee ? `${employee.givenName} ${employee.surname}` : "Unbekannter Mitarbeiter";
            return {
                label,
                to: `/employee/${match.params.employeeId}`,
            }
        }
    },
    element: <EmployeeContextProvider><Outlet/></EmployeeContextProvider>,
    children: [
        {
            index: true,
            element: <EmployeeDetailPage/>,
        },
        employeeEditRoute,
        employeeHistoryRoute
    ],
}