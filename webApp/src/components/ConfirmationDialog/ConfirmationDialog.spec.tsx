import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationDialog } from './ConfirmationDialog';
import {act} from "react";

describe('ConfirmationDialog', () => {
    test('renders provided employee names', async () => {
        const names = ['Alice Johnson', 'Bob Smith'];
        const onClose = jest.fn();

        await act(async () => {
            render(<ConfirmationDialog onClose={onClose} employeeNames={names} />);
        });

        expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
        expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    });

    test('calls onClose with false when user clicks "Nein" (cancel)', async () => {
        const names = ['Charlie'];
        const onClose = jest.fn();

        await act(async () => {
            render(<ConfirmationDialog onClose={onClose} employeeNames={names} />);
        });

        const cancelButton = screen.getByText('Nein');
        await act(async () => {
            fireEvent.click(cancelButton);
        });

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledWith(false);
    });

    test('calls onClose with true when user clicks "Ja" (confirm)', async () => {
        const names = ['Dana'];
        const onClose = jest.fn();

        await act(async () => {
            render(<ConfirmationDialog onClose={onClose} employeeNames={names} />);
        });

        const confirmButton = screen.getByText('Ja');
        await act(async () => {
            fireEvent.click(confirmButton);
        });

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledWith(true);
    });
});