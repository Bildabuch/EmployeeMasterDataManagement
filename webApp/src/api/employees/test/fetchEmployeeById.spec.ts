import fetchMock from 'jest-fetch-mock';
import {fetchEmployeeById} from './../fetchEmployeeById';
import {createResponseObject} from '../../createResponseObject.ts';
import {create500ResponseObject} from '../../create500ResponseObject.ts';

fetchMock.enableMocks();
jest.mock('../../createResponseObject.ts', () => ({
    createResponseObject: jest.fn(),
}));

jest.mock('../../create500ResponseObject.ts', () => ({
    create500ResponseObject: jest.fn(),
}));

describe('fetchEmployeeById', () => {
    const mockEmployeeId = '12345';
    const mockUrl = `http://localhost:8080/employees/${encodeURIComponent(mockEmployeeId)}`;
    const mockEmployeeDto = { id: '12345', name: 'John Doe' };

    beforeEach(() => {
        fetchMock.resetMocks();
        jest.clearAllMocks();
    });

    it('returns a ResponseObject when the API call is successful', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockEmployeeDto));
        (createResponseObject as jest.Mock).mockResolvedValue({ success: true, data: mockEmployeeDto });

        const result = await fetchEmployeeById(mockEmployeeId);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl);
        expect(createResponseObject).toHaveBeenCalledWith(expect.any(Response));
        expect(result).toEqual({ success: true, data: mockEmployeeDto });
    });

    it('returns a 500 ResponseObject when the API call fails', async () => {
        fetchMock.mockRejectOnce(new Error('Network error'));
        (create500ResponseObject as jest.Mock).mockReturnValue({ success: false, statusCode: 500 });

        const result = await fetchEmployeeById(mockEmployeeId);

        expect(fetchMock).toHaveBeenCalledWith(mockUrl);
        expect(create500ResponseObject).toHaveBeenCalled();
        expect(result).toEqual({ success: false, statusCode: 500 });
    });

    it('encodes the employeeId in the URL', async () => {
        const specialEmployeeId = '123/45';
        const encodedUrl = `http://localhost:8080/employees/${encodeURIComponent(specialEmployeeId)}`;
        fetchMock.mockResponseOnce(JSON.stringify(mockEmployeeDto));
        (createResponseObject as jest.Mock).mockResolvedValue({ success: true, data: mockEmployeeDto });

        await fetchEmployeeById(specialEmployeeId);

        expect(fetchMock).toHaveBeenCalledWith(encodedUrl);
    });

    it('logs an error when the API call fails', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        fetchMock.mockRejectOnce(new Error('Network error'));
        (create500ResponseObject as jest.Mock).mockReturnValue({ success: false, statusCode: 500 });

        await fetchEmployeeById(mockEmployeeId);

        expect(consoleErrorSpy).toHaveBeenCalledWith('Error to fetch employee:', expect.any(Error));
        consoleErrorSpy.mockRestore();
    });
});