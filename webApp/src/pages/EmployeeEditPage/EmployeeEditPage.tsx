import {useEmployee} from "../../components/EmployeeContextProvider";
import {PageHeader} from "../../components";
import {EmployeeFormular} from "../../components/EmployeeFormular/EmployeeFormular.tsx";
import {appRoutePaths} from "../../routes/appRoutePaths.ts";
import {Stack, Button} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {updateEmployee} from "../../api/employees";
import type {EditFromOrigin} from "../../components/EmployeeEditAction/EditFromOrigin";
import {ReactElement, useCallback, useState} from "react";
import {closeSnackbar, useSnackbar} from "notistack";
import {Employee} from "../../models";

/**
 * A React component for editing an employee's details. It provides a form pre-filled
 * with the employee's data and handles form submission, including error handling and
 * navigation after a successful update.
 *
 * @returns {ReactElement} The rendered `EmployeeEditPage` component.
 */
export const EmployeeEditPage = (): ReactElement => {
    const employee = useEmployee();
    const navigate = useNavigate();
    const location = useLocation();
    const {enqueueSnackbar} = useSnackbar();
    const [updateNotPossible, setUpdateNotPossible] = useState<boolean>(false);
    const from = (location.state as { from?: string })?.from as EditFromOrigin | undefined;
    const [errorMessages, setErrorMessages] = useState<Record<string, string> | undefined>(undefined);

    const navigateBack = useCallback(() => {
        if (from === "detail")
            navigate(appRoutePaths.employee.detail(employee?.id!), {state: {revalidate: true}});
        else
            navigate(appRoutePaths.employee.list);

    }, [from, navigate, employee]);

    const showReloadToast = useCallback(() => {
        enqueueSnackbar("Daten sind veraltet!", {
            variant: "error",
            persist: true,
            action: (key) => (
                <Button
                    color="inherit"
                    size="small"
                    onClick={() => {
                        closeSnackbar(key);
                        window.location.reload();
                    }}>
                    Seite neu laden
                </Button>
            )
        });
    }, [enqueueSnackbar]);

    const handleUpdate = useCallback(async (employee: Employee) => {
        try {
            const updatedEmployee = await updateEmployee(employee);

            if (updatedEmployee.error && updatedEmployee.status === 409) {
                setUpdateNotPossible(true);
                showReloadToast();
                return;
            } else if (updatedEmployee.error) {
                throw new Error();
            }

            if (updatedEmployee.data.errorMessages) {
                setErrorMessages(updatedEmployee.data.errorMessages);
                return
            }
            enqueueSnackbar("Mitarbeiter erfolgreich aktualisiert", {variant: "success"});
            navigateBack();
        } catch (error) {
            console.error("Error updating employee:");
            enqueueSnackbar("Fehler beim Aktualisieren des Mitarbeiters", {variant: "error"});
        }
    }, [showReloadToast, enqueueSnackbar, navigateBack]);

    return <Stack justifyContent="space-between"
                  spacing={2}>
        <PageHeader heading="Mitarbeiter bearbeiten"/>
        <EmployeeFormular initialData={employee}
                          errorMessages={errorMessages}
                          disableSubmitButton={updateNotPossible}
                          onSubmit={handleUpdate}/>
    </Stack>
};
