import {screen, waitFor} from '@testing-library/react';
import {render} from "../../testUtils/customRenderer";
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import {EmployeeFormular, EmployeeFormularProps} from './EmployeeFormular';

jest.mock('./validateEmployee', () => ({
    validateEmployee: jest.fn(),
}));
jest.mock('shared', () => ({
    EmployeeValidationErrorKeys: {
        EMPLOYEE_GIVEN_NAME_BLANK: { name: 'EMPLOYEE_GIVEN_NAME_BLANK' },
        EMPLOYEE_SURNAME_BLANK: { name: 'EMPLOYEE_SURNAME_BLANK' },
        EMPLOYEE_BIRTH_DATE_INVALID_UNKNOWN_ERROR: { name: 'EMPLOYEE_BIRTH_DATE_INVALID_UNKNOWN_ERROR' },
        EMPLOYEE_BIRTH_DATE_IN_FUTURE: { name: 'EMPLOYEE_BIRTH_DATE_IN_FUTURE' },
        EMPLOYEE_BIRTH_DATE_UNDERAGE: { name: 'EMPLOYEE_BIRTH_DATE_UNDERAGE' },
        PENSION_INSURANCE_NUMBER_BLANK: { name: 'PENSION_INSURANCE_NUMBER_BLANK' },
        PENSION_INSURANCE_NUMBER_FORMAT_INVALID: { name: 'PENSION_INSURANCE_NUMBER_FORMAT_INVALID' },
        PENSION_INSURANCE_NUMBER_BIRTHDATE_INVALID: { name: 'PENSION_INSURANCE_NUMBER_BIRTHDATE_INVALID' },
        PENSION_INSURANCE_NUMBER_CONTROL_DIGIT_INVALID: { name: 'PENSION_INSURANCE_NUMBER_CONTROL_DIGIT_INVALID' },
        PENSION_INSURANCE_NUMBER_INVALID_UNKNOWN_ERROR: { name: 'PENSION_INSURANCE_NUMBER_INVALID_UNKNOWN_ERROR' },
        TAX_IDENTIFICATION_NUMBER_INVALID: { name: 'TAX_IDENTIFICATION_NUMBER_INVALID' },
        EMPLOYEE_TIN_BLANK: { name: 'EMPLOYEE_TIN_BLANK' },
    },
}));
const {validateEmployee} = require('./validateEmployee');

describe('EmployeeFormular', () => {
    beforeEach(() => {
        validateEmployee.mockClear();
    });

    it('passes entered values to onSubmit when creating a new employee', async () => {
        validateEmployee.mockReturnValue({});
        const onSubmit = jest.fn().mockResolvedValue(undefined);

        render(<EmployeeFormular onSubmit={onSubmit}/>);

        const givenInput = screen.getByRole('textbox', {name: /Vorname/i});
        const surnameInput = screen.getByRole('textbox', {name: /Nachname/i});
        const pensionInput = screen.getByRole('textbox', {name: /Rentenversicherungsnummer/i});
        const taxInput = screen.getByRole('textbox', {name: /Steueridentifikationsnummer/i});
        const submitButton = screen.getByRole('button', {name: /Mitarbeiter anlegen/i});

        await userEvent.clear(givenInput);
        await userEvent.type(givenInput, 'Max');
        await userEvent.clear(surnameInput);
        await userEvent.type(surnameInput, 'Mustermann');
        await userEvent.clear(pensionInput);
        await userEvent.type(pensionInput, 'PIN123');
        await userEvent.clear(taxInput);
        await userEvent.type(taxInput, 'TIN456');

        await userEvent.click(submitButton);

        await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));

        const submitted = onSubmit.mock.calls[0][0];
        expect(submitted.givenName).toBe('Max');
        expect(submitted.surname).toBe('Mustermann');
        expect(submitted.pensionInsuranceNumber).toBe('PIN123');
        expect(submitted.taxIdentificationNumber).toBe('TIN456');
        expect(validateEmployee).toHaveBeenCalledTimes(1);
    });

    it('overwrites initial values and returns updated values on save', async () => {
        validateEmployee.mockReturnValue({});
        const onSubmit = jest.fn().mockResolvedValue(undefined);

        const initialData: EmployeeFormularProps["initialData"] = {
            id: '1',
            givenName: 'Anna',
            surname: 'Schmidt',
            birthDate: dayjs('1990-02-03'),
            pensionInsuranceNumber: 'OLDPIN',
            taxIdentificationNumber: 'OLDTIN',
            version: "1",
        };

        render(<EmployeeFormular initialData={initialData} onSubmit={onSubmit}/>);

        const givenInput = screen.getByRole('textbox', {name: /Vorname/i});
        const pensionInput = screen.getByRole('textbox', {name: /Rentenversicherungsnummer/i});
        const submitButton = screen.getByRole('button', {name: /Änderungen speichern/i});

        await userEvent.clear(givenInput);
        await userEvent.type(givenInput, 'Anja');
        await userEvent.clear(pensionInput);
        await userEvent.type(pensionInput, 'NEWPIN');

        await userEvent.click(submitButton);

        await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));

        const submitted = onSubmit.mock.calls[0][0];
        expect(submitted.givenName).toBe('Anja');
        expect(submitted.pensionInsuranceNumber).toBe('NEWPIN');
        expect(validateEmployee).toHaveBeenCalledTimes(1);
    });
});