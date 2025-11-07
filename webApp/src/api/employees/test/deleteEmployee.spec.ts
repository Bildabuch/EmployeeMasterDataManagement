import fetchMock from 'jest-fetch-mock';
import {baseUrl} from "../../baseUrl.ts";
import {deleteEmployee} from "../deleteEmployee.ts";

fetchMock.enableMocks();

describe('deleteEmployee', () => {
    const mockEmployeeId = '12345';
    const mockUrl = `${baseUrl}/employees/${mockEmployeeId}`;

    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('returns true when the employee is successfully deleted', async () => {
        fetchMock.mockResponseOnce('', {status: 200});

        const result = await deleteEmployee(mockEmployeeId);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl, {method: 'DELETE'});
        expect(result).toBe(true);
    });

    it('returns false when the API responds with a 404 status', async () => {
        fetchMock.mockResponseOnce('', {status: 404});

        const result = await deleteEmployee(mockEmployeeId);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl, {method: 'DELETE'});
        expect(result).toBe(false);
    });

    it('returns false when the API call fails', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify("Internal Server Error"),
            {status: 500}
        );

        const result = await deleteEmployee(mockEmployeeId);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl, {method: 'DELETE'});
        expect(result).toBe(false);
    });

    it('encodes the employeeId in the URL', async () => {
        const specialEmployeeId = '123/45';
        const encodedUrl = `${baseUrl}/employees/${encodeURIComponent(specialEmployeeId)}`;
        fetchMock.mockResponseOnce('', {status: 200});

        await deleteEmployee(specialEmployeeId);

        expect(fetchMock).toHaveBeenCalledWith(encodedUrl, {method: 'DELETE'});
    });
});