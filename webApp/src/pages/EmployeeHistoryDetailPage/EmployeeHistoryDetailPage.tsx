import {useLoaderData} from "react-router-dom";
import {type EmployeeHistoryEntry} from "../../models";
import {determineEmployeeName} from "../../utilities";
import {PageHeader} from "../../components";
import {Stack, Typography} from "@mui/material";
import {EmployeeDetails} from "../../components/EmployeeDetails/EmployeeDetails.tsx";
import {ReactElement} from "react";

/**
 * A React component that displays the details of a specific employee history entry.
 * It retrieves the history entry data using the React Router loader and determines
 * the employee's name for display. If the history entry is not found, an error message is shown.
 *
 * @returns {ReactElement} The rendered `EmployeeHistoryDetailPage` component.
 */
export const EmployeeHistoryDetailPage = (): ReactElement => {
    const employeeHistoryEntry = useLoaderData<EmployeeHistoryEntry>();
    const employeeName = determineEmployeeName(employeeHistoryEntry);

    return <Stack justifyContent="space-between"
                  spacing={2}>
        {employeeHistoryEntry && <>
            <PageHeader heading={employeeName}/>
            <EmployeeDetails employee={employeeHistoryEntry}/>
        </>
        }
        {!employeeHistoryEntry && <Typography variant="h6"
                                              color="error">
            Der angeforderte Mitarbeiter wurde nicht gefunden.
        </Typography>}
    </Stack>
};
