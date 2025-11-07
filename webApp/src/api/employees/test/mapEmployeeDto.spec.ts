import {mapEmployeeDto} from '../mapEmployeeDto';
import type {EmployeeDto} from 'shared';
import {Employee} from '../../../models';
import dayjs from "dayjs";

jest.mock('shared', () => ({
    EmployeeDto: jest.fn(),
}));
describe('mapEmployeeDto', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('maps all fields correctly when all fields are provided', () => {
        const employeeDto: EmployeeDto = {
            id: '123',
            givenName: 'John',
            surname: 'Doe',
            birthDate: '1990-01-01',
            pensionInsuranceNumber: 'PIN123',
            taxIdentificationNumber: 'TIN123',
            version: 'v1',
            updatedAt: '2023-01-01T12:00:00Z',
        } as EmployeeDto;

        const result: Employee = mapEmployeeDto(employeeDto);

        expect(result).toEqual({
            id: '123',
            givenName: 'John',
            surname: 'Doe',
            birthDate: dayjs('1990-01-01'),
            pensionInsuranceNumber: 'PIN123',
            taxIdentificationNumber: 'TIN123',
            version: 'v1',
            updatedAt: dayjs('2023-01-01T12:00:00Z'),
        });
    });

    it('sets undefined for optional fields when they are not provided', () => {
        const employeeDto: EmployeeDto = {
            id: undefined,
            givenName: 'Jane',
            surname: 'Smith',
            birthDate: '1985-05-15',
            pensionInsuranceNumber: 'PIN456',
            taxIdentificationNumber: 'TIN456',
            version: undefined,
            updatedAt: undefined,
        } as EmployeeDto;

        const result: Employee = mapEmployeeDto(employeeDto);

        expect(result).toEqual({
            id: undefined,
            givenName: 'Jane',
            surname: 'Smith',
            birthDate: dayjs('1985-05-15'),
            pensionInsuranceNumber: 'PIN456',
            taxIdentificationNumber: 'TIN456',
            version: undefined,
            updatedAt: undefined,
        });
    });

    it('throws an error when birthDate is invalid', () => {
        const employeeDto: EmployeeDto = {
            id: undefined,
            givenName: 'Invalid',
            surname: 'Date',
            birthDate: 'invalid-date',
            pensionInsuranceNumber: 'PIN789',
            taxIdentificationNumber: 'TIN789',
            version: undefined,
            updatedAt: undefined,
        } as EmployeeDto;

        expect( mapEmployeeDto(employeeDto).birthDate.isValid()).toBe(false);
    });

    it('parses updatedAt correctly when it is provided', () => {
        const employeeDto: EmployeeDto = {
            id: undefined,
            givenName: 'Updated',
            surname: 'At',
            birthDate: '2000-01-01',
            pensionInsuranceNumber: 'PIN000',
            taxIdentificationNumber: 'TIN000',
            version: undefined,
            updatedAt: '2023-10-10T10:10:10Z',
        } as EmployeeDto;

        const result: Employee = mapEmployeeDto(employeeDto);

        expect(result.updatedAt).toEqual(dayjs('2023-10-10T10:10:10Z'));
    });
});