import {type ReactElement} from 'react';
import {Button, Stack} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {Link} from "react-router-dom";
import {appRoutePaths} from "../../routes/appRoutePaths.ts";
import {EmployeeEditAction} from "../../components/EmployeeEditAction/EmployeeEditAction.tsx";
import {EmployeeDeleteAction} from "../../components/EmployeeDeleteAction/EmployeeDeleteAction.tsx";
import {Employee} from "../../models";

/**
 * EmployeesGridActionsProps
 *
 * The props for the `EmployeesGridActions` component.
 *
 * @property {Employee[]} selectedEmployees - The list of employees currently selected in the grid.
 */
export interface EmployeesGridActionsProps {
    selectedEmployees: Employee[];
}

/**
 * A React component that renders action buttons for the employee grid.
 * Includes options to create, edit, or delete employees based on the current selection.
 *
 * @param {EmployeesGridActionsProps} props - The props for the component.
 * @returns {ReactElement} The rendered `EmployeesGridActions` component.
 */
export const EmployeesGridActions = (props: EmployeesGridActionsProps): ReactElement => {
    const {selectedEmployees} = props;

    return <Stack spacing={3}
                  direction="row">
        <Button variant="text"
                component={Link}
                size="small"
                to={appRoutePaths.employee.create}
                startIcon={<AddIcon/>}>
            Erstellen
        </Button>
        <EmployeeEditAction employeeId={selectedEmployees.length === 1 ? selectedEmployees[0].id : undefined}
                            from="list"/>
        <EmployeeDeleteAction employeesToDelete={selectedEmployees}/>
    </Stack>
};
