import {fetchHistoryForEmployee} from '../fetchHistoryForEmployee.ts';
import {EmployeeHistoryEntry} from '../../../models';
import {baseUrl} from '../../baseUrl.ts';
import fetchMock from 'jest-fetch-mock';
import dayjs from "dayjs";

fetchMock.enableMocks();

describe('fetchHistoryForEmployee', () => {
    const mockEmployeeId = '12345';
    const mockUrl = `${baseUrl}/employee-versions/${mockEmployeeId}`;
    jest.useFakeTimers().setSystemTime(new Date('2025-11-07T14:43:50.000Z'));
    const mockHistory: EmployeeHistoryEntry[] = [{
        id: '1',
        surname: 'Doe',
        givenName: 'Jane',
        version: 'v1',
        updatedAt: dayjs("2025-11-07T14:43:50.000Z"),
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
        expect(result.data).toEqual([...mockHistory]);
    });

    it('returns an empty array when the API call fails with a non-200 status', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            status: 404,
            statusText: 'Not Found',
        });

        const result = await fetchHistoryForEmployee(mockEmployeeId);

        expect(fetch).toHaveBeenCalledWith(mockUrl);
        expect(result.data).toEqual(null);
        expect(result.status).toBe(404);
        expect(result.error).toBeTruthy();
    });

    it('returns an empty array when the fetch call throws an error', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({message: 'Internal Server Error'}),
            {status: 500}
        );

        const result = await fetchHistoryForEmployee(mockEmployeeId);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl);
        expect(result.data).toEqual(null);
        expect(result.status).toBe(500);
        expect(result.error).toBeTruthy();
    });
});
