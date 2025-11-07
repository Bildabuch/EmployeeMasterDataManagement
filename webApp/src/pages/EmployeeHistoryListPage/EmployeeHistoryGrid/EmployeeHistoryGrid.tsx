import {type ReactElement} from 'react';
import {DataGrid, GridRowParams} from "@mui/x-data-grid";
import {Box} from "@mui/material";
import {EmployeeHistoryEntry} from "../../../models";
import {columns} from "./ColumnDefinitions.tsx";

/**
 * The properties for the `EmployeeHistoryGrid` component.
 *
 * @property {EmployeeHistoryEntry[]} employeeHistoryEntries -The list of history entries to be displayed in the grid.
 * @property {(employeeHistoryEntry: EmployeeHistoryEntry) => void} onRowClick - Callback function that is called when a row is clicked.
 */
export interface EmployeeHistoryGridProps {
    employeeHistoryEntries: EmployeeHistoryEntry[];
    onRowClick: (employeeHistoryEntry: EmployeeHistoryEntry) => void;
}

/**
 * A React component that renders a DataGrid to display an employee's history entries.
 * Allows clicking on rows to perform further actions.
 *
 * @param {EmployeeHistoryGridProps} props -The properties for the component.
 * @returns {ReactElement} The rendered `EmployeeHistoryGrid` component.
 */
export const EmployeeHistoryGrid = (props: EmployeeHistoryGridProps): ReactElement => {
    const {
        employeeHistoryEntries,
        onRowClick
    } = props;

    const handleRowClick = (event: GridRowParams<EmployeeHistoryEntry>) => {
        onRowClick(event.row);
    }

    return <Box sx={{height: '100%', width: '100%'}}>
        <DataGrid rows={employeeHistoryEntries}
                  columns={columns}
                  initialState={{
                      pagination: {
                          paginationModel: {
                              pageSize: 5,
                          },
                      },
                  }}
                  pageSizeOptions={[5]}
                  onRowClick={handleRowClick}
                  disableRowSelectionOnClick/>
    </Box>
};
