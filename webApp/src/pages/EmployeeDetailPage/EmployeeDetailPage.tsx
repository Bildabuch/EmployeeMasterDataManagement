import {PageHeader} from "../../components";
import {EmployeeDetails} from "../../components/EmployeeDetails/EmployeeDetails.tsx";
import {Button, Stack, Typography} from "@mui/material";
import {EmployeeEditAction} from "../../components/EmployeeEditAction/EmployeeEditAction.tsx";
import {EmployeeDeleteAction} from "../../components/EmployeeDeleteAction/EmployeeDeleteAction.tsx";
import {useEmployee} from "../../components/EmployeeContextProvider";
import HistoryIcon from '@mui/icons-material/History';
import {Link, useLocation, useNavigate, useRevalidator} from "react-router-dom";
import {appRoutePaths} from "../../routes/appRoutePaths.ts";
import {ReactElement, useEffect} from "react";
import {determineEmployeeName} from "../../utilities";

/**
 * A React component that displays an employee's details. It offers
 * actions such as editing, deleting, and accessing the employee's history.
 * The component refreshes the view when revalidation is required.
 *
 * @returns {ReactElement} The rendered `EmployeeDetailPage` component.
 */
export const EmployeeDetailPage = (): ReactElement => {
    const employee = useEmployee();
    const employeeName = determineEmployeeName(employee);
    const revalidator = useRevalidator();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const state = (location.state as { revalidate?: boolean } | null);
        if (state?.revalidate) {
            revalidator.revalidate();

            navigate(location.pathname, {replace: true, state: {...(location.state as object), revalidate: false}});
        }
    }, [location, revalidator, navigate]);

    return <Stack justifyContent="space-between"
                  spacing={2}>
        {employee && <>
            <PageHeader heading={employeeName}
                        actions={<Stack direction="row" spacing={3}>
                            <Button size="small"
                                    variant="text"
                                    startIcon={<HistoryIcon/>}
                                    component={Link}
                                    to={appRoutePaths.employeeHistory.list(employee.id ?? "0")}>
                                Historie
                            </Button>
                            <EmployeeEditAction employeeId={employee.id}/>
                            <EmployeeDeleteAction employeesToDelete={[employee ?? []]}/>
                        </Stack>
                        }/>
            <EmployeeDetails employee={employee}/>
        </>
        }
        {!employee && <Typography variant="h6"
                                  color="error">
            Der angeforderte Mitarbeiter wurde nicht gefunden.
        </Typography>}
    </Stack>
};
