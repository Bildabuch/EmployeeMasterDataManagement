import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {appRoutePaths} from "../../routes/appRoutePaths.ts";
import EditIcon from "@mui/icons-material/Edit";
import {type ReactElement} from "react";
import {EditFromOrigin} from "./EditFromOrigin.ts";

/**
 * Props for the EmployeeEditAction component.
 *
 * @interface EmployeeEditActionProps
 * @property {string} [employeeId] - The ID of the employee to be edited. If not provided, the button is disabled.
 * @property {EditFromOrigin} [from] - The origin of the edit action, defaults to "detail".
 */
export interface EmployeeEditActionProps {
    employeeId?: string;
    from?: EditFromOrigin;
}

/**
 * This component renders a button that navigates to the employee edit page.
 * The button is disabled if no `employeeId` is provided.
 *
 * @param {EmployeeEditActionProps} props - The properties for the component.
 * @returns {ReactElement} The rendered EmployeeEditAction component.
 */
export const EmployeeEditAction = (props: EmployeeEditActionProps): ReactElement => {
    const {employeeId} = props;
    const from = props.from || "detail";
    return <Button variant="text"
                   size="small"
                   component={Link}
                   color="primary"
                   disabled={!employeeId}
                   to={appRoutePaths.employee.edit(employeeId ?? '')}
                   state={{from}}
                   startIcon={<EditIcon/>}>
        Bearbeiten
    </Button>
};
