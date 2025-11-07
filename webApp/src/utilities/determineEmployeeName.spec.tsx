import {determineEmployeeName} from './determineEmployeeName.tsx';
import {Employee} from '../models';

describe('useEmployeeName', () => {
    it('returns full name when employee is provided', () => {
        const employee: Employee = {givenName: 'John', surname: 'Doe'} as Employee;

        const result = determineEmployeeName(employee);

        expect(result).toBe('John Doe');
    });

    it('returns fallback when employee is undefined', () => {
        const result = determineEmployeeName(undefined);

        expect(result).toBe('Mitarbeiter nicht gefunden');
    });

    it('returns fallback when employee is null', () => {
        const result = determineEmployeeName(null as unknown as Employee);

        expect(result).toBe('Mitarbeiter nicht gefunden');
    });

    it('returns custom fallback when provided and employee is undefined', () => {
        const result = determineEmployeeName(undefined, 'Kein Mitarbeiter vorhanden');

        expect(result).toBe('Kein Mitarbeiter vorhanden');
    });

    it('handles empty givenName and surname gracefully', () => {
        const employee: Employee = {givenName: '', surname: ''} as Employee;

        const result = determineEmployeeName(employee);

        expect(result).toBe(' ');
    });
});