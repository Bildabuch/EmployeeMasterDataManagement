import {useLoaderData, useNavigate} from "react-router-dom";
import {EmployeeGrid} from "./EmployeeGrid/EmployeeGrid.tsx";
import {Stack} from "@mui/material";
import {Employee} from "../../models";
import {PageHeader} from "../../components";
import {EmployeesGridActions} from "./EmployeesGridActions.tsx";
import {ReactElement, useMemo, useState} from "react";
import {appRoutePaths} from "../../routes/appRoutePaths.ts";

/**
 * A React component that displays a list of employees in a grid format.
 * It allows users to select employees and navigate to detailed views.
 *
 * @returns {ReactElement} The rendered `EmployeeListPage` component.
 */
export const EmployeeListPage = (): ReactElement => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const employees = useLoaderData<Employee[]>();
    const navigate = useNavigate();

    const selectedEmployees = useMemo(() =>
        employees.filter(e => selectedIds.includes(e.id!)), [selectedIds, employees]);

    return <Stack justifyContent="space-between"
                  flex={1}
                  spacing={2}>
        <PageHeader heading="Mitarbeiter"
                    actions={<EmployeesGridActions selectedEmployees={selectedEmployees}/>}/>
        <EmployeeGrid employees={employees}
                      onSelectionChange={(selectedIds) => setSelectedIds(selectedIds)}
                      onRowClick={employee => navigate(appRoutePaths.employee.detail(employee.id!))}/>
    </Stack>
};
