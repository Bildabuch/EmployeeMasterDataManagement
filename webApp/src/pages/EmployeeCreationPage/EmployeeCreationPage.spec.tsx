import {screen} from '@testing-library/react';
import {render} from "../../testUtils/customRenderer";
import userEvent from '@testing-library/user-event';
import {EmployeeCreationPage} from './EmployeeCreationPage';
import {postEmployee} from '../../api/employees';
import {appRoutePaths} from '../../routes/appRoutePaths';
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';

jest.mock('shared', () => ({
    EmployeeDto: jest.fn(),
}));
jest.mock('../../api/employees');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
jest.mock('notistack', () => ({
    useSnackbar: jest.fn(),
}));
jest.mock('../../components', () => ({
    PageHeader: ({heading}: any) => <h4>{heading}</h4>,
}));
jest.mock('../../components/EmployeeFormular/EmployeeFormular.tsx', () => ({
    EmployeeFormular: ({onSubmit}: any) => <button onClick={() => onSubmit?.({firstName: 'Max'})}>mock-submit</button>,
}));

describe('EmployeeCreationPage', () => {
    const mockNavigate = jest.fn();
    const mockEnqueueSnackbar = jest.fn();

    beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        (useSnackbar as jest.Mock).mockReturnValue({enqueueSnackbar: mockEnqueueSnackbar});
        jest.clearAllMocks();
    });

    it('renders the PageHeader with the correct heading', () => {
        render(<EmployeeCreationPage/>);
        expect(screen.getByText('Mitarbeiter anlegen', {selector: 'h4'})).toBeInTheDocument();
    });

    it('calls onSubmit from EmployeeFormular and navigates to detail on successful creation', async () => {
        (postEmployee as jest.Mock).mockResolvedValue({data: {createdEmployeeId: '1'}, error: null});
        render(<EmployeeCreationPage/>);

        const submitButton = screen.getByRole('button', {name: /mock-submit/i});
        await userEvent.click(submitButton);

        expect(postEmployee).toHaveBeenCalledWith({firstName: 'Max'});
        expect(mockEnqueueSnackbar).toHaveBeenCalledWith('Mitarbeiter erfolgreich erstellt', {variant: 'success'});
        expect(mockNavigate).toHaveBeenCalledWith(appRoutePaths.employee.detail('1'));
    });
});