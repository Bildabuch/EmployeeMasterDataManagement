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
            loader: async ({params}) => {
                const response = await fetchHistoryForEmployee(params.employeeId!);
                if (response.error) {
                    console.error(`Error fetching history for employee ${params.employeeId}: Status ${response.status}`);
                    return undefined;
                }
                return response.data;
            },
            element: <EmployeeHistoryListPage/>,
        },
        employeeHistoryDetail
    ]
};