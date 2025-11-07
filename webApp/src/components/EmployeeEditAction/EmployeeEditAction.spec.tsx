import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MemoryRouter, Routes, Route, useLocation} from 'react-router-dom';

jest.mock('../../routes/appRoutePaths.ts', () => ({
    appRoutePaths: {
        employee: {
            edit: (id: string) => `/employees/${id}/edit`,
        },
    },
}));

import {EmployeeEditAction} from './EmployeeEditAction';

const TestReceiver: React.FC = () => {
    const location = useLocation();
    return <div data-testid="location-state">{JSON.stringify(location.state)}</div>;
};

describe('EmployeeEditAction navigation', () => {
    it('navigates to the edit route and passes default from="detail" when clicked', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<EmployeeEditAction employeeId="1" />} />
                    <Route path="/employees/:id/edit" element={<TestReceiver />} />
                </Routes>
            </MemoryRouter>
        );

        const link = screen.getByRole('link', {name: /Bearbeiten/i});
        await userEvent.click(link);

        const stateDiv = await screen.findByTestId('location-state');
        const state = JSON.parse(stateDiv.textContent || '{}');
        expect(state.from).toBe('detail');
    });

    it('navigates to the edit route and passes provided from value when clicked', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<EmployeeEditAction employeeId="42" from="list" />} />
                    <Route path="/employees/:id/edit" element={<TestReceiver />} />
                </Routes>
            </MemoryRouter>
        );

        const link = screen.getByRole('link', {name: /Bearbeiten/i});
        await userEvent.click(link);

        const stateDiv = await screen.findByTestId('location-state');
        const state = JSON.parse(stateDiv.textContent || '{}');
        expect(state.from).toBe('list');
    });
});