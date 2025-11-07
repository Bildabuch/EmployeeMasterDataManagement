import {render, screen} from '@testing-library/react';
import {PageHeader} from './PageHeader';

describe('PageHeader', () => {
    it('renders the component with heading and no actions', () => {
        render(<PageHeader heading="Header Only"/>);
        expect(screen.getByText('Header Only')).toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders the component with heading and actions', () => {
        render(<PageHeader heading="Header with Actions" actions={<button>Action</button>}/>);
        expect(screen.getByText('Header with Actions')).toBeInTheDocument();
        expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('renders multiple actions when provided', () => {
        render(<PageHeader heading="Header with Multiple Actions"
                           actions={
                               <>
                                   <button>Action 1</button>
                                   <button>Action 2</button>
                               </>
                           }/>);
        expect(screen.getByText('Header with Multiple Actions')).toBeInTheDocument();
        expect(screen.getByText('Action 1')).toBeInTheDocument();
        expect(screen.getByText('Action 2')).toBeInTheDocument();
    });

})