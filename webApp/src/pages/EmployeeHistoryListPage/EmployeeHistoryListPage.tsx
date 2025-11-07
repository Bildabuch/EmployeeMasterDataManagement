import {useEmployee} from "../../components/EmployeeContextProvider";
import {PageHeader} from "../../components";
import {EmployeeHistoryGrid} from "./EmployeeHistoryGrid/EmployeeHistoryGrid.tsx";
import {Stack, Typography} from "@mui/material";
import {determineEmployeeName} from "../../utilities";
import {useLoaderData, useNavigate} from "react-router-dom";
import {EmployeeHistoryEntry} from "../../models";
import {appRoutePaths} from "../../routes/appRoutePaths.ts";
import {ReactElement} from "react";

/**
 * A React component that displays the history entries for the currently selected employee.
 * It retrieves the current employee from context, loads the employee's history entries via
 * the React Router loader, determines a display name for the employee, and provides
 * navigation to a detail view when a history row is clicked.
 *
 * @returns {ReactElement} The rendered EmployeeHistoryListPage component.
 */
export const EmployeeHistoryListPage = (): ReactElement => {
    const employee = useEmployee();
    const employeeHistoryEntries = useLoaderData<EmployeeHistoryEntry[]>();
    const employeeName = determineEmployeeName(employee);
    const navigate = useNavigate();

    return <Stack justifyContent="space-between"
                  flex={1}
                  spacing={2}>
        {employee && <><PageHeader heading={`${employeeName} (History)`}/>
            <EmployeeHistoryGrid employeeHistoryEntries={employeeHistoryEntries}
                                 onRowClick={employeeHistoryEntry => {
                                     navigate(appRoutePaths.employeeHistory.detail(employeeHistoryEntry.employeeId, employeeHistoryEntry.version))
                                 }}/>
        </>}
        {!employee && <Typography variant="h6"
                                  color="error">
            Der angeforderte Mitarbeiter wurde nicht gefunden.
        </Typography>}

    </Stack>
};
