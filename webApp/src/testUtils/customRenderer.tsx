import {render} from '@testing-library/react';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/de';
import {type ReactElement} from 'react';

const AllProviders = ({children}: { children: ReactElement }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}
                          adapterLocale="de">
        {children}
    </LocalizationProvider>
);

const customRender = (ui: ReactElement, options?: any) =>
    render(ui, {wrapper: AllProviders, ...options});

// override default render
export * from '@testing-library/react';
export {customRender as render};
