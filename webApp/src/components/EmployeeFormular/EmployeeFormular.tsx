import {type ReactElement, useEffect, useMemo, useState} from 'react';
import {Employee} from "../../models";
import {Button, Grid, Stack, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import {LinedHeading} from "../LinedHeading/LinedHeading.tsx";
import {EmployeeValidationErrors, validateEmployee} from "./validateEmployee.ts";
import SaveIcon from "@mui/icons-material/Save";
import {transformErrorObject} from "./transformErrorObject.ts";

/**
 * Props for the EmployeeFormular component.
 *
 * @interface EmployeeFormularProps
 * @property {Employee} [initialData] - Optional initial data for the employee form.
 * @property {(data: Employee) => Promise<void>} onSubmit - Callback function to handle form submission.
 * @property {boolean} [disableSubmitButton] - Optional flag to disable the submit button.
 */
export interface EmployeeFormularProps {
    initialData?: Employee;
    onSubmit: (data: Employee) => Promise<void>;
    disableSubmitButton?: boolean;
    errorMessages?: Record<string, string>;
}

/**
 * This component renders a form for managing employee data. It includes fields for personal
 * and tax-related information, validates the input, and handles form submission.
 *
 * @param {EmployeeFormularProps} props - The properties for the component.
 * @returns {ReactElement} The rendered EmployeeFormular component.
 */
export const EmployeeFormular = (props: EmployeeFormularProps): ReactElement => {
    const {initialData, onSubmit} = props;

    const disableSubmitButton = props.disableSubmitButton || false;
    const [givenName, setGivenName] = useState<string>(initialData?.givenName || '');
    const [surname, setSurname] = useState<string>(initialData?.surname || '');
    const [birthDate, setBirthDate] = useState<string>(initialData?.birthDate.toISOString() || dayjs().toISOString());
    const [pensionInsuranceNumber, setPensionInsuranceNumber] = useState<string>(initialData?.pensionInsuranceNumber || '');
    const [taxIdentificationNumber, setTaxIdentificationNumber] = useState<string>(initialData?.taxIdentificationNumber || '');
    const [errors, setErrors] = useState<EmployeeValidationErrors>(transformErrorObject(props.errorMessages) ?? {} as EmployeeValidationErrors);

    useEffect(() => {
        setErrors(transformErrorObject(props.errorMessages) || {} as EmployeeValidationErrors);
    }, [props.errorMessages]);

    const employee = useMemo(() =>
        ({
                id: initialData?.id,
                givenName,
                surname,
                birthDate: dayjs(birthDate),
                pensionInsuranceNumber,
                taxIdentificationNumber,
                version: initialData?.version,
            }
        ), [initialData,
        givenName,
        surname,
        birthDate,
        pensionInsuranceNumber,
        taxIdentificationNumber]);

    /**
     * Handles the form submission by validating the employee data and invoking the onSubmit callback.
     * If validation errors are present, they are displayed in the form.
     */
    const handleSubmit = async () => {
        const errors = validateEmployee(employee);
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            await onSubmit(employee);
        }
    }

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
                <TextField id="givenName"
                           value={givenName}
                           onChange={(e) => setGivenName(e.target.value)}
                           label="Vorname"
                           required
                           fullWidth
                           error={!!errors.givenName}
                           helperText={errors.givenName}
                           variant="outlined"/>
            </Grid>
            <Grid size={6}>
                <TextField id="surname"
                           value={surname}
                           onChange={(e) => setSurname(e.target.value)}
                           label="Nachname"
                           required
                           fullWidth
                           error={!!errors.surname}
                           helperText={errors.surname}
                           variant="outlined"/>
            </Grid>
            <Grid size={6}>
                <DatePicker label="Geburtstag"
                            sx={{width: '100%'}}
                            value={dayjs(birthDate)}
                            disableFuture
                            onChange={(value) =>
                                value && setBirthDate(value.toISOString())}
                            slotProps={{
                                textField: {
                                    helperText: errors.birthDate,
                                    error: !!errors.birthDate,
                                    required: true
                                }
                            }}
                />
            </Grid>
            <Grid size={6}>
            </Grid>
        </Grid>
        <LinedHeading heading="Steuerliche Informationen"/>
        <Grid container
              padding={1}
              spacing={3}>
            <Grid size={6}>
                <TextField id="pensionInsuranceNumber"
                           value={pensionInsuranceNumber}
                           onChange={(e) => setPensionInsuranceNumber(e.target.value)}
                           label="Rentenversicherungsnummer"
                           fullWidth
                           required
                           error={!!errors.pensionInsuranceNumber}
                           helperText={errors.pensionInsuranceNumber}
                           variant="outlined"/>
            </Grid>
            <Grid size={6}>
                <TextField id="taxIdentificationNumber"
                           value={taxIdentificationNumber}
                           onChange={(e) => setTaxIdentificationNumber(e.target.value)}
                           label="Steueridentifikationsnummer"
                           fullWidth
                           required
                           error={!!errors.taxIdentificationNumber}
                           helperText={errors.taxIdentificationNumber}
                           variant="outlined"/>
            </Grid>
        </Grid>

        <Button variant="contained"
                color="success"
                type="submit"
                disabled={disableSubmitButton}
                startIcon={<SaveIcon/>}
                onClick={handleSubmit}>
            {initialData ? 'Änderungen speichern' : 'Mitarbeiter anlegen'}
        </Button>
    </Stack>

};
