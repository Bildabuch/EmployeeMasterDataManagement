import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReadonlyTextField } from './ReadonlyTextField';

describe('ReadonlyTextField', () => {
    it('renders a disabled text field with default styles', () => {
        render(<ReadonlyTextField value="Readonly value" />);

        const textField = screen.getByDisplayValue('Readonly value');
        expect(textField).toBeInTheDocument();
        expect(textField).toHaveAttribute('disabled');
    });

    it('renders correctly when no value is provided', () => {
        render(<ReadonlyTextField />);

        const textField = screen.getByRole('textbox');
        expect(textField).toBeInTheDocument();
        expect(textField).toHaveAttribute('disabled');
        expect(textField).toHaveValue('');
    });

    it('does not allow user input', () => {
        render(<ReadonlyTextField value="Readonly value" />);

        const textField = screen.getByDisplayValue('Readonly value');
        expect(textField).toBeInTheDocument();
        expect(textField).toHaveAttribute('disabled');
    });
});