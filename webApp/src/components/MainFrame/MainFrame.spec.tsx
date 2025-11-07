import {render, screen} from '@testing-library/react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {MainFrame} from './MainFrame';
import '@testing-library/jest-dom';

describe('MainFrame', () => {
    it('renders the Breadcrumbs navigation', () => {
        const router = createBrowserRouter([{
            path: '/',
            element: <MainFrame/>,
            handle: {crumb: () => ({label: 'Home', to: '/'})},
            children: [],
        }]);
        render(
            <RouterProvider router={router} />
        );

        const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
        expect(nav).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('renders the Outlet child route content when a child route is provided', () => {
        const router = createBrowserRouter([{
            path: '/',
            element: <MainFrame/>,
            handle: {crumb: () => ({label: 'Home', to: '/'})},
            children: [
                { index: true, element: <div>Child Content</div> }
            ],
        }]);
        render(
            <RouterProvider router={router} />
        );

        expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('main layout contains breadcrumb and outlet areas together', () => {
        const router = createBrowserRouter([{
            path: '/',
            element: <MainFrame/>,
            handle: {crumb: () => ({label: 'Home', to: '/'})},
            children: [
                { index: true, element: <div>Child Area</div> }
            ],
        }]);
        render(
            <RouterProvider router={router} />
        );

        const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
        const layoutRoot = nav.parentElement!;
        expect(layoutRoot).toHaveTextContent('Home');
        expect(layoutRoot).toHaveTextContent('Child Area');
    });
});