import fetchMock from 'jest-fetch-mock';
import {mapEmployeeDto} from "../mapEmployeeDto.ts";
import {fetchAllEmployees} from "../fetchAllEmployees.ts";

fetchMock.enableMocks();
jest.mock('../mapEmployeeDto', () => ({
    mapEmployeeDto: jest.fn(),
}));

describe('fetchAllEmployees', () => {
    const mockEmployeeDtoList = [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
    ];
    const mockMappedEmployees = [
        { id: '1', fullName: 'John Doe' },
        { id: '2', fullName: 'Jane Smith' },
    ];

    beforeEach(() => {
        fetchMock.resetMocks();
        jest.clearAllMocks();
    });

    it('returns a list of employees when the API call is successful', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockEmployeeDtoList));
        (mapEmployeeDto as jest.Mock).mockImplementation((dto) => mockMappedEmployees.find(emp => emp.id === dto.id));

        const result = await fetchAllEmployees();

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/employees/');
        expect(mapEmployeeDto).toHaveBeenCalledTimes(mockEmployeeDtoList.length);
        expect(result.data).toEqual(mockMappedEmployees);
    });

    it('returns an empty array when the API call fails', async () => {
        fetchMock.mockRejectOnce(new Error('Network error'));

        const result = await fetchAllEmployees();

        expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/employees/');
        expect(mapEmployeeDto).not.toHaveBeenCalled();
        expect(result.data).toEqual(null);
    });

    it('logs an error when the API call fails', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        fetchMock.mockRejectOnce(new Error('Network error'));

        await fetchAllEmployees();

        expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching employees:', expect.any(Error));
        consoleErrorSpy.mockRestore();
    });
});