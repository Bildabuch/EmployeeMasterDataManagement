import {screen, fireEvent, waitFor} from '@testing-library/react';
import {render} from '../../testUtils/customRenderer';
import {EmployeeDeleteAction} from './EmployeeDeleteAction';
import {Employee} from '../../models';

jest.mock('../../api/employees', () => ({
    deleteEmployee: jest.fn(),
    deleteEmployees: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const mockEnqueueSnackbar = jest.fn();
jest.mock('notistack', () => ({
    useSnackbar: () => ({enqueueSnackbar: mockEnqueueSnackbar}),
}));

import {deleteEmployee, deleteEmployees} from '../../api/employees';
import {act} from "react";

describe('EmployeeDeleteAction', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('calls deleteEmployee and navigates/snackbars after confirming single employee', async () => {
        const employee: Employee = {id: '1', givenName: 'Alice', surname: 'Johnson'} as Employee;
        (deleteEmployee as jest.Mock).mockResolvedValueOnce(undefined);

        await act(async () => {
            render(<EmployeeDeleteAction employeesToDelete={[employee]}/>);
        });

        // open dialog
        const deleteButton = screen.getByText('Löschen');
        await act(async () => {
            fireEvent.click(deleteButton);
        });

        // confirm
        const confirmButton = screen.getByText('Ja');
        await act(async () => {
            fireEvent.click(confirmButton);
        });

        await waitFor(() => {
            expect(deleteEmployee).toHaveBeenCalledTimes(1);
            expect(deleteEmployee).toHaveBeenCalledWith('1');
            expect(mockNavigate).toHaveBeenCalled();
            expect(mockEnqueueSnackbar).toHaveBeenCalled();
        });
    });

    test('calls deleteEmployees for multiple employees when confirmed', async () => {
        const employees: Employee[] = [
            {id: '1', givenName: 'Bob', surname: 'Smith'} as Employee,
            {id: '2', givenName: 'Carol', surname: 'White'} as Employee,
        ];
        (deleteEmployees as jest.Mock).mockResolvedValueOnce(undefined);

        await act(async () => {
            render(<EmployeeDeleteAction employeesToDelete={employees}/>);
        });

        // delete label includes count: "Löschen (2)"
        const deleteButton = screen.getByText(/Löschen/);
        await act(async () => {
            fireEvent.click(deleteButton);
        });

        const confirmButton = screen.getByText('Ja');
        await act(async () => {
            fireEvent.click(confirmButton);
        });

        await waitFor(() => {
            expect(deleteEmployees).toHaveBeenCalledTimes(1);
            expect(deleteEmployees).toHaveBeenCalledWith(['1', '2']);
            expect(mockNavigate).toHaveBeenCalled();
            expect(mockEnqueueSnackbar).toHaveBeenCalled();
        });
    });

    test('does not call API when user cancels the dialog', async () => {
        const employee: Employee = {id: '3', givenName: 'Dana', surname: 'Lee'} as Employee;

        await act(async () => {
            render(<EmployeeDeleteAction employeesToDelete={[employee]}/>);
        });

        const deleteButton = screen.getByText('Löschen');
        await act(async () => {
            fireEvent.click(deleteButton);
        });

        const cancelButton = screen.getByText('Nein');
        await act(async () => {
            fireEvent.click(cancelButton);
        });

        await waitFor(() => {
            expect(deleteEmployee).not.toHaveBeenCalled();
            expect(deleteEmployees).not.toHaveBeenCalled();
            expect(mockNavigate).not.toHaveBeenCalled();
            expect(mockEnqueueSnackbar).not.toHaveBeenCalled();
        });
    });

    test('delete button is disabled when no employees are selected', async () => {
        await act(async () => {
            render(<EmployeeDeleteAction employeesToDelete={[]}/>);
        });

        const deleteButton = screen.getByText('Löschen') as HTMLButtonElement;
        expect(deleteButton).toBeDisabled();
    });
});