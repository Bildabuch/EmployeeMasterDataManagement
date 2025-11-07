import {type ReactElement} from 'react';
import {Grid, Stack} from "@mui/material";
import {LinedHeading} from "../LinedHeading/LinedHeading.tsx";
import dayjs from "dayjs";
import {Employee} from "../../models";
import {ReadonlyTextField} from "../ReadonlyTextField/ReadonlyTextField.tsx";
import {ReadonlyDatePicker} from "../ReadonlyDatePicker/ReadonlyDatePicker.tsx";

/**
 * Props for the EmployeeDetails component.
 *
 * @interface EmployeeDetailsProps
 * @property {Employee} employee - The employee object containing details to display.
 */
export interface EmployeeDetailsProps {
    employee: Employee
}

/**
 * This component displays detailed information about an employee, including personal
 * and tax-related information, in a read-only format.
 *
 * @param {EmployeeDetailsProps} props - The properties for the component.
 * @returns {ReactElement} The rendered EmployeeDetails component.
 */
export const EmployeeDetails = (props: EmployeeDetailsProps): ReactElement => {
    const {employee} = props;
    const {
        givenName,
        surname,
        birthDate,
        pensionInsuranceNumber,
        taxIdentificationNumber
    } = employee;

    return <Stack spacing={2}
                  sx={{
                      flexGrow: 1,
                      marginLeft: 'auto',
                      marginRight: 'auto'
                  }}>
        <LinedHeading heading="Persönliche Informationen"/>
        <Grid container
              padding={1}
              spacing={3}>
            <Grid size={6}>
                <ReadonlyTextField id="givenName"
                                   value={givenName}
                                   label="Vorname"
                                   fullWidth
                                   variant="filled"/>
            </Grid>
            <Grid size={6}>
                <ReadonlyTextField id="surname"
                                   value={surname}
                                   label="Nachname"
                                   fullWidth
                                   variant="filled"/>
            </Grid>
            <Grid size={6}>
                <ReadonlyDatePicker label="Geburtstag"
                                    value={dayjs(birthDate)}/>
            </Grid>
            <Grid size={6}>
            </Grid>
        </Grid>
        <LinedHeading heading="Steuerliche Informationen"/>
        <Grid container
              padding={1}
              spacing={3}>
            <Grid size={6}>
                <ReadonlyTextField value={pensionInsuranceNumber}
                                   id="pensionInsuranceNumber"
                                   label="Rentenversicherungsnummer"
                                   fullWidth
                                   variant="filled"/>
            </Grid>
            <Grid size={6}>
                <ReadonlyTextField value={taxIdentificationNumber}
                                   id="taxIdentificationNumber"
                                   label="Steueridentifikationsnummer"
                                   fullWidth
                                   variant="filled"/>
            </Grid>
        </Grid>

    </Stack>

};
