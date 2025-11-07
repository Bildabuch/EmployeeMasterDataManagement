import fetchMock from 'jest-fetch-mock';
import {baseUrl} from "../../baseUrl.ts";
import {deleteEmployees} from "../deleteEmployees.ts";

fetchMock.enableMocks();
describe('deleteEmployees', () => {
    const mockEmployeeIds = ['12345', '67890'];
    const mockUrl = `${baseUrl}/employees/delete-multiple`;

    beforeEach(() => {
        fetchMock.resetMocks();
    });
    it('returns a structured response object when employees are successfully deleted', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ success: true }), {status: 200});

        const result = await deleteEmployees(mockEmployeeIds);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(mockEmployeeIds),
        });
        expect(result.data).toEqual({ success: true });
        expect(result.error).toBeFalsy();
    });

    it('returns a 500 response object when the API call throws an error', async () => {
        fetchMock.mockRejectOnce(new Error('Network Error'));

        const result = await deleteEmployees(mockEmployeeIds);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(mockEmployeeIds),
        });
        expect(result.error).toBeTruthy();
        expect(result.status).toBe(500);
    });

    it('handles empty employeeIds gracefully', async () => {
        const emptyEmployeeIds: string[] = [];
        fetchMock.mockResponseOnce('', {status: 400});

        const result = await deleteEmployees(emptyEmployeeIds);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(emptyEmployeeIds),
        });
        expect(result.error).toBeTruthy();
        expect(result.status).toBe(400);
    });

    it('handles special characters in employeeIds correctly', async () => {
        const specialEmployeeIds = ['abc@123', 'def#456'];
        fetchMock.mockResponseOnce('{}', {status: 200});

        const result = await deleteEmployees(specialEmployeeIds);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(specialEmployeeIds),
        });
        expect(result.error).toBeFalsy();
    });
});