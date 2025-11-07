import {type ReactElement, useCallback, useMemo, useState} from 'react';
import {Button, CircularProgress} from "@mui/material";
import {ConfirmationDialog} from "../ConfirmationDialog/ConfirmationDialog.tsx";
import {Employee} from "../../models";
import {useNavigate} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteEmployee, deleteEmployees} from "../../api/employees";
import {appRoutePaths} from "../../routes/appRoutePaths.ts";
import {useSnackbar} from "notistack";

/**
 * Props for the EmployeeDeleteAction component.
 *
 * @interface EmployeeDeleteActionProps
 *
 * @property {Employee[]} employeesToDelete
 *   The list of employees to be deleted. Each employee is represented by an object
 *   containing their details.
 */
export interface EmployeeDeleteActionProps {
    employeesToDelete: Employee[];
}

/**
 * A React component that renders a delete button for deleting one or more employees.
 * When clicked, it opens a confirmation dialog. If the deletion is confirmed, the
 * employees are deleted, and a success message is displayed.
 *
 * @param {EmployeeDeleteActionProps} props - The properties passed to the component.
 * @param {Employee[]} props.employeesToDelete - The list of employees to delete.
 *
 * @returns {ReactElement} A button and a confirmation dialog for deleting employees.
 *
 * Implementation details:
 * - The delete button is disabled if no employees are selected or if a deletion is in progress.
 * - The confirmation dialog displays the names of the employees to be deleted.
 * - Uses Material UI components for styling and structure.
 * - Displays a loading spinner on the button while the deletion is in progress.
 */
export const EmployeeDeleteAction = (props: EmployeeDeleteActionProps): ReactElement => {
    const {employeesToDelete} = props;
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [promisePending, setPromisePending] = useState<boolean>(false);
    const {enqueueSnackbar} = useSnackbar();

    const navigate = useNavigate()

    const deleteLabel = useMemo(() => {
        const amount = employeesToDelete.length;
        if (amount > 1) {
            return `Löschen (${amount})`;
        }
        return `Löschen`;
    }, [employeesToDelete]);

    const deletePassedEmployees = useCallback(async () => {
        if (employeesToDelete.length === 0) return;
        if (employeesToDelete.length === 1)
            return deleteEmployee(employeesToDelete[0].id!);
        return deleteEmployees(employeesToDelete.map(e => e.id!));
    }, [employeesToDelete])

    const handleConfirmedDelete = useCallback(() => {
        setPromisePending(true);
        deletePassedEmployees()
            .then(response => {
                if (response?.error) {
                    enqueueSnackbar("Fehler beim Löschen der Mitarbeiter", {variant: "error"});
                    return
                }
                if (response?.data.failedEmployeeIds.length > 0) {
                    enqueueSnackbar(`Fehler beim Löschen einiger Mitarbeiter (${[...response?.data.failedEmployeeIds].join(", ")})`, {variant: "error"});
                    return;
                }
                navigate(appRoutePaths.employee.list);
                enqueueSnackbar("Mitarbeiter erfolgreich gelöscht", {variant: "success"});
            })
            .finally(() => {
                setPromisePending(false);
            });
    }, [navigate, enqueueSnackbar, deletePassedEmployees]);

    return <>
        <Button variant="text"
                color="error"
                size="small"
                onClick={() => setDialogOpen(true)}
                startIcon={promisePending ? <CircularProgress size={20}/> : <DeleteIcon/>}
                disabled={employeesToDelete.length === 0 || promisePending}>
            {deleteLabel}
        </Button>
        {dialogOpen && <ConfirmationDialog employeeNames={employeesToDelete.map(e => `${e.givenName} ${e.surname}`)}
                                           onClose={confirmed => {
                                               setDialogOpen(false);
                                               if (confirmed)
                                                   handleConfirmedDelete();
                                           }}
        />}
    </>
};
