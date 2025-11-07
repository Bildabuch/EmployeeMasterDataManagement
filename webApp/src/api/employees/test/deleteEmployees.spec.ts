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

    it('returns true when employees are successfully deleted', async () => {
        fetchMock.mockResponseOnce('', {status: 200});

        const result = await deleteEmployees(mockEmployeeIds);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(mockEmployeeIds),
        });
        expect(result).toBe(true);
    });

    it('returns false when the API responds with a 404 status', async () => {
        fetchMock.mockResponseOnce('', {status: 404});

        const result = await deleteEmployees(mockEmployeeIds);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(mockEmployeeIds),
        });
        expect(result).toBe(false);
    });

    it('returns false when the API call fails', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify("Internal Server Error"),
            {status: 500}
        );

        const result = await deleteEmployees(mockEmployeeIds);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(mockEmployeeIds),
        });
        expect(result).toBe(false);
    });

    it('encodes the employeeIds in the request body', async () => {
        const specialEmployeeIds = ['123/45', '678/90'];
        fetchMock.mockResponseOnce('', {status: 200});

        await deleteEmployees(specialEmployeeIds);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(specialEmployeeIds),
        });
    });
});