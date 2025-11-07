import {type ReactElement, useCallback} from 'react';
import {columns} from "./ColumnDefinitions.tsx";
import {DataGrid, GridRowParams, GridRowSelectionModel} from '@mui/x-data-grid';
import {Stack} from "@mui/material";
import {Employee} from "../../../models";

/**
 * EmployeeGridProps
 *
 * The props for the `EmployeeGrid` component.
 *
 * @property {Employee[]} employees - The list of employees to display in the grid.
 * @property {(selectedIds: string[]) => void} onSelectionChange - Callback triggered when the row selection changes.
 * @property {(employee: Employee) => void} onRowClick - Callback triggered when a row is clicked.
 */
export interface EmployeeGridProps {
    employees: Employee[];
    onSelectionChange: (selectedIds: string[]) => void;
    onRowClick: (employee: Employee) => void;
}

/**
 * A React component that renders a data grid for displaying employee information.
 *
 * @param {EmployeeGridProps} props - The props for the component.
 * @returns {ReactElement} The rendered `EmployeeGrid` component.
 */
export const EmployeeGrid = (props: EmployeeGridProps): ReactElement => {
    const {
        employees,
        onSelectionChange,
        onRowClick
    } = props;

    const handleRowSelectionChange = useCallback((event: GridRowSelectionModel) => {
        const ids = [...event.ids];
        if (event.type === "include") {
            onSelectionChange(ids as string[]);
            return
        }

        const filteredIds = employees.map(emp => emp.id)
            .filter(Boolean)
            .filter(id => !ids.includes(id!)) as string[];
        onSelectionChange(filteredIds);
    }, [employees, onSelectionChange]);

    const handleRowClick = useCallback((event: GridRowParams<Employee>) => {
        onRowClick(event.row);
    }, [onRowClick]);

    return  <Stack direction="row"
                   sx={{
                       maxHeight: 'calc(100vh - 200px)',
                       height: '100vh'
                   }}>
        <DataGrid rows={employees}
                  columns={columns}
                  onRowClick={handleRowClick}
                  checkboxSelection
                  disableRowSelectionOnClick
                  onRowSelectionModelChange={handleRowSelectionChange}/>
    </Stack>
};
