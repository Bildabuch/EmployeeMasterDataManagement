import {screen} from '@testing-library/react';
import {render} from '../../testUtils/customRenderer';
import '@testing-library/jest-dom';
import {Breadcrumb} from './Breadcrumb';

describe('Breadcrumb', () => {
    test('renders an anchor link when `to` prop is provided', () => {
        render(<Breadcrumb label="Home" to="/home"/>);

        const link = screen.getByRole('link', {name: 'Home'});
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/home');
    });

    test('renders plain text when `to` prop is not provided', () => {
        render(<Breadcrumb label="Dashboard"/>);

        const text = screen.getByText('Dashboard');
        expect(text).toBeInTheDocument();

        // ensure it is not rendered as a link
        const link = screen.queryByRole('link', {name: 'Dashboard'});
        expect(link).not.toBeInTheDocument();
    });
});