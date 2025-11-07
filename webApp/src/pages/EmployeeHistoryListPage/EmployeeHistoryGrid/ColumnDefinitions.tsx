import {GridColDef} from '@mui/x-data-grid';
import {EmployeeHistoryEntry} from "../../../models";
import dayjs from "dayjs";

/**
 * Column definitions for the EmployeeHistoryGrid.
 * These columns define how the data for employee history entries is displayed in the grid.
 */
export const columns: GridColDef<EmployeeHistoryEntry>[] = [
    {
        field: 'version',
        headerName: 'Version',
        width: 100,
        sortable: true,
    },
    {
        field: 'givenName',
        headerName: 'Vorname',
        width: 150,
    },
    {
        field: 'surname',
        headerName: 'Nachname',
        width: 150,
    },
    {
        field: 'birthDate',
        headerName: 'Geburtsdatum',
        width: 150,
        valueFormatter: (value) => {
            return dayjs(value).format('DD.MM.YYYY');
        }
    },
    {
        field: 'pensionInsuranceNumber',
        headerName: 'Rentenversicherungsnummer',
        width: 200,
    },
    {
        field: 'taxIdentificationNumber',
        headerName: 'Steueridentifikationsnummer',
        width: 200,
    },
    {
        field: 'createdAt',
        headerName: 'Geändert am',
        width: 180,
        valueFormatter: (value) => {
            return dayjs(value).format('DD.MM.YYYY HH:mm');
        }
    }
];