import {RouteObject, UIMatch} from "react-router-dom";
import {fetchHistoryForEmployeeByVersion} from "../../api/employeHistory";
import {EmployeeHistoryEntry} from "../../models";
import {EmployeeHistoryDetailPage} from "../../pages";

export const employeeHistoryDetail: RouteObject = {
    path: ':versionId',
    loader: async ({params}) => {
        const response = await fetchHistoryForEmployeeByVersion(params.employeeId!, params.versionId!);
        if (response.error) {
            console.error(`Error fetching history for employee ${params.employeeId} version ${params.versionId}: Status ${response.status}`);
            return undefined;
        }
        return response.data;
    },
    handle: {
        crumb: (match: UIMatch<EmployeeHistoryEntry>) => ({
            label: `${match.params.versionId}`,
            to: `/employee/${match.params.employeeId}/history/${match.params.versionId}`,
        })

    },
    element: <EmployeeHistoryDetailPage/>,
}