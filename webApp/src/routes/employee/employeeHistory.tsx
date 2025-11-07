import {RouteObject, UIMatch} from "react-router-dom";
import {EmployeeHistoryListPage} from "../../pages";
import {fetchHistoryForEmployee} from "../../api/employeHistory";
import {EmployeeHistoryEntry} from "../../models";
import {employeeHistoryDetail} from "./employeeHistoryDetail.tsx";

export const employeeHistoryRoute: RouteObject = {
    path: "history",
    handle: {
        crumb: (match: UIMatch<EmployeeHistoryEntry[]>) => ({
            label: "Historie",
            to: `/employee/${match.params.employeeId}/history`,
        })

    },
    children: [
        {
            index: true,
            loader: async ({params}) =>
                fetchHistoryForEmployee(params.employeeId!),
            element: <EmployeeHistoryListPage/>,
        },
        employeeHistoryDetail
    ]
};