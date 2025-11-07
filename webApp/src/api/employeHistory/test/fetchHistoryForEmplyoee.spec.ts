import {fetchHistoryForEmployee} from '../fetchHistoryForEmployee.ts';
import {EmployeeHistoryEntry} from '../../../models';
import {baseUrl} from '../../baseUrl.ts';
import fetchMock from 'jest-fetch-mock';
import dayjs from "dayjs";

fetchMock.enableMocks();

describe('fetchHistoryForEmployee', () => {
    const mockEmployeeId = '12345';
    const mockUrl = `${baseUrl}/employee-versions/${mockEmployeeId}`;
    const mockHistory: EmployeeHistoryEntry[] = [{
        id: '1',
        surname: 'Doe',
        givenName: 'Jane',
        version: 'v1',
        createdAt: dayjs(),
        employeeId: '12345',
        birthDate: dayjs('1990-01-01'),
        pensionInsuranceNumber: 'PIN123456',
        taxIdentificationNumber: 'TID123456',
    }];
    let consoleErrorSpy: jest.SpyInstance;
    beforeEach(() => {
        fetchMock.resetMocks();
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.resetAllMocks();
        consoleErrorSpy.mockRestore();
    });

    it('returns employee history when the API call is successful', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify(mockHistory),
            {status: 200}
        );

        const result = await fetchHistoryForEmployee(mockEmployeeId);

        expect(fetch).toHaveBeenCalledWith(mockUrl);
        expect(result).toEqual(JSON.parse(JSON.stringify(mockHistory)));
    });

    it('returns an empty array when the API call fails with a non-200 status', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            status: 404,
            statusText: 'Not Found',
        });

        const result = await fetchHistoryForEmployee(mockEmployeeId);

        expect(fetch).toHaveBeenCalledWith(mockUrl);
        expect(result).toEqual([]);
    });

    it('logs an error message when the API call fails with a non-200 status', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        (fetch as jest.Mock).mockResolvedValue({
            status: 500,
            statusText: 'Internal Server Error',
        });

        await fetchHistoryForEmployee(mockEmployeeId);

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Error fetching employee history:',
            'Internal Server Error'
        );

        consoleErrorSpy.mockRestore();
    });

    it('returns an empty array when the fetch call throws an error', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({message: 'Internal Server Error'}),
            {status: 500}
        );

        const result = await fetchHistoryForEmployee(mockEmployeeId);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl);
        expect(result).toEqual([]);
    });
});
