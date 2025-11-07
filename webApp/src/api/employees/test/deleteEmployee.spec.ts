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

    it('returns a 500 response object when the API call throws an error', async () => {
        fetchMock.mockRejectOnce(new Error('Network Error'));

        const result = await deleteEmployee(mockEmployeeId);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl, {method: 'DELETE'});
        expect(result.error).toBeTruthy();
        expect(result.status).toBe(500);
    });

    it('handles empty employeeId gracefully', async () => {
        const emptyEmployeeId = '';
        const emptyUrl = `${baseUrl}/employees/${encodeURIComponent(emptyEmployeeId)}`;
        fetchMock.mockResponseOnce('', {status: 400});

        const result = await deleteEmployee(emptyEmployeeId);

        expect(fetchMock).toHaveBeenCalledWith(emptyUrl, {method: 'DELETE'});
        expect(result.error).toBeTruthy();
        expect(result.status).toBe(400);
    });

    it('handles special characters in employeeId correctly', async () => {
        const specialEmployeeId = 'abc@123';
        const encodedUrl = `${baseUrl}/employees/${encodeURIComponent(specialEmployeeId)}`;
        fetchMock.mockResponseOnce('{}', {status: 200});

        const result = await deleteEmployee(specialEmployeeId);

        expect(fetchMock).toHaveBeenCalledWith(encodedUrl, {method: 'DELETE'});
        expect(result.error).toBeFalsy();
    });
});