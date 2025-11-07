import {Stack} from "@mui/material";
import {PageHeader} from "../../components";
import {EmployeeFormular} from "../../components/EmployeeFormular/EmployeeFormular.tsx";
import {useNavigate} from "react-router-dom";
import {postEmployee} from "../../api/employees";
import {appRoutePaths} from "../../routes/appRoutePaths.ts";
import {useSnackbar} from "notistack";
import {ReactElement, useCallback, useState} from "react";
import {Employee} from "../../models";

/**
 * The `EmployeeCreationPage` component renders a page for creating a new employee.
 * It includes a header and a form for submitting employee data.
 *
 * @component
 * @returns {ReactElement} The rendered `EmployeeCreationPage` component.
 */
export const EmployeeCreationPage = (): ReactElement => {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const [errorMessages, setErrorMessages] = useState<Record<string, string> | undefined>(undefined);

    const handleCreation = useCallback(async (employee: Employee) => {
        try {
            const createdEmployee = await postEmployee(employee);
            if (createdEmployee.error) {
                throw new Error();
            }
            if (createdEmployee.data.errorMessages) {
                setErrorMessages(createdEmployee.data.errorMessages);
                return
            }
            if (createdEmployee.data.createdEmployeeId) {
                enqueueSnackbar("Mitarbeiter erfolgreich erstellt", {variant: "success"});
                navigate(appRoutePaths.employee.detail(createdEmployee.data.createdEmployeeId ?? ""));
            }
        } catch (error) {
            enqueueSnackbar("Fehler beim Erstellen des Mitarbeiters", {variant: "error"});
            console.error("Error creating employee:", error);
        }
    }, []);

    return <Stack justifyContent="space-between"
                  spacing={2}>
        <PageHeader heading="Mitarbeiter anlegen"/>

        <EmployeeFormular errorMessages={errorMessages}
                          onSubmit={async (employee) => handleCreation(employee)}/>
    </Stack>
};
