import { Employee } from '../../models';

const mockValidate = jest.fn();

jest.mock('shared', () => ({
    EmployeeDto: jest.fn().mockImplementation((...args: any[]) => ({ args })),
    EmployeeValidatorService: {
        getInstance: () => ({ validate: mockValidate })
    },
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
    }
}));

import { validateEmployee } from './validateEmployee';

describe('validateEmployee', () => {
    const baseEmployee = {
        givenName: 'John',
        surname: 'Doe',
        birthDate: { format: (_: string) => '1980-01-01' },
        pensionInsuranceNumber: 'PIN',
        taxIdentificationNumber: 'TIN'
    } as unknown as Employee;

    beforeEach(() => {
        mockValidate.mockReset();
    });

    it('should call EmployeeValidatorService.validate once', () => {
        mockValidate.mockReturnValue(new Map());
        validateEmployee(baseEmployee);
        expect(mockValidate).toHaveBeenCalledTimes(1);
    });

    it('should transform givenName and surname errors correctly', () => {
        const map = new Map<string, string>([
            ['EMPLOYEE_GIVEN_NAME_BLANK', 'given name missing'],
            ['EMPLOYEE_SURNAME_BLANK', 'surname missing']
        ]);
        mockValidate.mockReturnValue(map);

        const result = validateEmployee(baseEmployee);
        expect(result.givenName).toEqual(['given name missing']);
        expect(result.surname).toEqual(['surname missing']);
    });

    it('should aggregate multiple pension insurance errors into one array', () => {
        const map = new Map<string, string>([
            ['PENSION_INSURANCE_NUMBER_BLANK', 'pin blank'],
            ['PENSION_INSURANCE_NUMBER_FORMAT_INVALID', 'pin format invalid'],
            ['PENSION_INSURANCE_NUMBER_CONTROL_DIGIT_INVALID', 'pin control digit invalid']
        ]);
        mockValidate.mockReturnValue(map);

        const result = validateEmployee(baseEmployee);
        expect(result.pensionInsuranceNumber).toEqual([
            'pin blank',
            'pin format invalid',
            'pin control digit invalid'
        ]);
    });

    it('should aggregate multiple tax identification errors into one array', () => {
        const map = new Map<string, string>([
            ['TAX_IDENTIFICATION_NUMBER_INVALID', 'tin invalid'],
            ['EMPLOYEE_TIN_BLANK', 'tin blank']
        ]);
        mockValidate.mockReturnValue(map);

        const result = validateEmployee(baseEmployee);
        expect(result.taxIdentificationNumber).toEqual(['tin invalid', 'tin blank']);
    });

    it('should transform birthDate error correctly', () => {
        const map = new Map<string, string>([
            ['EMPLOYEE_BIRTH_DATE_INVALID_UNKNOWN_ERROR', 'birthdate missing']
        ]);
        mockValidate.mockReturnValue(map);

        const result = validateEmployee(baseEmployee);
        expect(result.birthDate).toEqual(['birthdate missing']);
    });

    it('should throw when an unknown validation key is returned', () => {
        const map = new Map<string, string>([
            ['UNKNOWN_KEY', 'some error']
        ]);
        mockValidate.mockReturnValue(map);

        expect(() => validateEmployee(baseEmployee)).toThrow('Unknown validation error key: UNKNOWN_KEY');
    });
});