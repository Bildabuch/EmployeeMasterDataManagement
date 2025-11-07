import {screen} from '@testing-library/react';
import {render} from '../../testUtils/customRenderer';
import '@testing-library/jest-dom';
import {Breadcrumbs} from './Breadcrumbs';
import {useMatches} from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useMatches: jest.fn(),
}));

describe('Breadcrumbs', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders intermediate crumbs as links and the last crumb as plain text when all crumbs provide "to"', () => {
        (useMatches as jest.Mock).mockReturnValue([
            { handle: { crumb: () => ({ label: 'Home', to: '/' }) } },
            { handle: { crumb: () => ({ label: 'Dashboard', to: '/dashboard' }) } },
        ]);

        render(<Breadcrumbs />);

        const homeLink = screen.getByRole('link', { name: 'Home' });
        expect(homeLink).toHaveAttribute('href', '/');

        const dashboardText = screen.getByText('Dashboard');
        expect(dashboardText).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'Dashboard' })).not.toBeInTheDocument();
    });

    it('renders the last crumb as plain text even if the crumb provides a "to" property', () => {
        (useMatches as jest.Mock).mockReturnValue([
            { handle: { crumb: () => ({ label: 'Level 1', to: '/level1' }) } },
            { handle: { crumb: () => ({ label: 'Level 2', to: '/level2' }) } },
            { handle: { crumb: () => ({ label: 'Current', to: '/current' }) } },
        ]);

        render(<Breadcrumbs />);

        expect(screen.getByRole('link', { name: 'Level 1' })).toHaveAttribute('href', '/level1');
        expect(screen.getByRole('link', { name: 'Level 2' })).toHaveAttribute('href', '/level2');

        const currentText = screen.getByText('Current');
        expect(currentText).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'Current' })).not.toBeInTheDocument();
    });
});