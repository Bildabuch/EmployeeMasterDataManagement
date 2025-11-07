import fetchMock from 'jest-fetch-mock';
import {fetchHistoryForEmployeeByVersion} from '../fetchHistoryForEmployeeByVersion.ts';
import {EmployeeHistoryEntry} from '../../../models';
import {baseUrl} from "../../baseUrl.ts";
import dayjs from "dayjs";

fetchMock.enableMocks();
describe('fetchHistoryForEmployeeByVersion', () => {
    const mockEmployeeId = '12345';
    const mockVersion = 'v1';
    const mockUrl = `${baseUrl}/employee-versions/${mockEmployeeId}/${mockVersion}`;
    jest.useFakeTimers().setSystemTime(new Date('2025-11-07T14:43:50.000Z'))
    const mockHistory: EmployeeHistoryEntry = {
        id: '1',
        surname: 'Doe',
        givenName: 'Jane',
        version: 'v1',
        updatedAt: dayjs(),
        employeeId: '12345',
        birthDate: dayjs('2025-11-07T14:43:50.000Z'),
        pensionInsuranceNumber: 'PIN123456',
        taxIdentificationNumber: 'TID123456',
    };

    let consoleErrorSpy: jest.SpyInstance;
    beforeEach(() => {
        fetchMock.resetMocks();
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
        consoleErrorSpy.mockRestore();
    });

    it('fetches employee history successfully and returns a ResponseObject', async () => {
        const response = JSON.stringify(mockHistory);
        fetchMock.mockResponseOnce(response, {status: 200});

        const result = await fetchHistoryForEmployeeByVersion(mockEmployeeId, mockVersion);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl);
        expect(result.error).toBe(false);
        expect(result.data).toEqual(mockHistory);
    });

    it('returns an error ResponseObject when the API returns a 404 status', async () => {
        fetchMock.mockResponseOnce('', {status: 404});

        const result = await fetchHistoryForEmployeeByVersion(mockEmployeeId, mockVersion);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl);
        expect(result.error).toBe(true);
        expect(result.status).toBe(404);
    });

    it('returns an error ResponseObject when the API call fails', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({message: 'Internal Server Error'}),
            {status: 500}
        );
        const result = await fetchHistoryForEmployeeByVersion(mockEmployeeId, mockVersion);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl);
        expect(result.error).toBe(true);
    });

    it('encodes employeeId and version in the URL', async () => {
        const specialEmployeeId = '123/45';
        const specialVersion = 'v1.0';
        const encodedUrl = `${baseUrl}/employee-versions/${encodeURIComponent(specialEmployeeId)}/${encodeURIComponent(specialVersion)}`;
        fetchMock.mockResponseOnce(JSON.stringify(mockHistory), {status: 200});

        await fetchHistoryForEmployeeByVersion(specialEmployeeId, specialVersion);

        expect(fetchMock).toHaveBeenCalledWith(encodedUrl);
    });
});