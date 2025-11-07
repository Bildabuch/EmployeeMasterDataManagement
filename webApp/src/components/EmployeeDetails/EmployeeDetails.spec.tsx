import {screen} from '@testing-library/react';
import {render} from "../../testUtils/customRenderer";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {EmployeeDetails} from './EmployeeDetails';
import {Employee} from "../../models";

dayjs.extend(customParseFormat);

describe('EmployeeDetails', () => {
    it('displays all transferred employee data in full', () => {
        const employee: Employee = {
            id: '1',
            givenName: 'Anna',
            surname: 'Schmidt',
            birthDate: dayjs('06.03.1987', 'DD.MM.YYYY'),
            pensionInsuranceNumber: 'PIN-1990',
            taxIdentificationNumber: 'TIN-12345',
            version: "2",
        };
        const {container} = render(<EmployeeDetails employee={employee}/>);

        expect(screen.getByDisplayValue(employee.givenName)).toBeInTheDocument();
        expect(screen.getByDisplayValue(employee.surname)).toBeInTheDocument();
        expect(screen.getByDisplayValue(employee.pensionInsuranceNumber)).toBeInTheDocument();
        expect(screen.getByDisplayValue(employee.taxIdentificationNumber)).toBeInTheDocument();

        const allElements = Array.from(container.querySelectorAll<HTMLElement>('*'));
        const foundDateMatch = allElements.some(el => {

            const value = (el as HTMLInputElement).value ?? '';
            const text = el.textContent ?? '';
            const candidate = (value || text).trim();
            if (!candidate) return false;
            const parsed = dayjs(candidate, "DD.MM.YYYY");
            return parsed.isValid() && parsed.isSame(employee.birthDate, 'day');
        });

        expect(foundDateMatch).toBe(true);
    });
});