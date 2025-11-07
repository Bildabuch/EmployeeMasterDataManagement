import fetchMock from 'jest-fetch-mock';
import {postEmployee} from '../postEmployee';
import {createResponseObject} from '../../createResponseObject.ts';
import {create500ResponseObject} from '../../create500ResponseObject.ts';
import {Employee} from '../../../models';
import dayjs from "dayjs";

fetchMock.enableMocks();
jest.mock('shared', () => ({
    EmployeeDto: jest.fn(),
}));
jest.mock('../../createResponseObject.ts', () => ({
    createResponseObject: jest.fn(),
}));

jest.mock('../../create500ResponseObject.ts', () => ({
    create500ResponseObject: jest.fn(),
}));

describe('postEmployee', () => {
    const mockEmployee: Employee = {
        givenName: 'John',
        surname: 'Doe',
        birthDate: dayjs('1990-01-01'),
        pensionInsuranceNumber: 'PIN123',
        taxIdentificationNumber: 'TIN123',
    };

    const mockResponseObject = {success: true, data: mockEmployee};

    beforeEach(() => {
        fetchMock.resetMocks();
        jest.clearAllMocks();
    });

    it('returns a ResponseObject when the API call is successful', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockEmployee));
        (createResponseObject as jest.Mock).mockResolvedValue(mockResponseObject);

        const result = await postEmployee(mockEmployee);

        expect(createResponseObject).toHaveBeenCalledWith(expect.any(Response));
        expect(result).toEqual(mockResponseObject);
    });

    it('returns a 500 ResponseObject when the API call fails', async () => {
        fetchMock.mockRejectOnce(new Error('Network error'));
        (create500ResponseObject as jest.Mock).mockReturnValue({success: false, statusCode: 500});

        const result = await postEmployee(mockEmployee);

        expect(create500ResponseObject).toHaveBeenCalled();
        expect(result).toEqual({success: false, statusCode: 500});
    });

    it('logs an error when the API call fails', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
        });
        fetchMock.mockRejectOnce(new Error('Network error'));
        (create500ResponseObject as jest.Mock).mockReturnValue({success: false, statusCode: 500});

        await postEmployee(mockEmployee);

        expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching employees:', expect.any(Error));
        consoleErrorSpy.mockRestore();
    });

});