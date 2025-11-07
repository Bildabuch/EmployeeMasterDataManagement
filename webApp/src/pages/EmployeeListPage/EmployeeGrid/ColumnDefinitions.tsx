import {GridColDef} from '@mui/x-data-grid';
import {Employee} from "../../../models";
import dayjs from "dayjs";

/**
 * Column definitions for the Employee grid.
 *
 * This array defines the columns to be displayed in the data grid for employees.
 * Each column is represented as an object with properties such as field name,
 * header name, width, and sorting options.
 *
 * @type {GridColDef<Employee>[]}
 */
export const columns: GridColDef<Employee>[] = [
    {
        field: 'givenName',
        headerName: 'Vorname',
        width: 150,
        sortable: true,
    },
    {
        field: 'surname',
        headerName: 'Nachname',
        width: 150,
        sortable: true,
    },
    {
        field: 'birthDate',
        headerName: 'Geburtsdatum',
        width: 150,
        sortable: true,
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
    }
];