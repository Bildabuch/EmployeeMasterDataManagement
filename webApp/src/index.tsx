import React from 'react';
import ReactDOM from 'react-dom/client';
import {SnackbarProvider} from "notistack";
import {RecoilRoot} from 'recoil';
import {RouterProvider} from "./components/RouterProvider/RouterProvider.tsx";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/de';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const MAX_CONCURRENT_SNACKBARS = 5
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <RecoilRoot>
            <LocalizationProvider dateAdapter={AdapterDayjs}
                                  adapterLocale="de">
                <SnackbarProvider maxSnack={MAX_CONCURRENT_SNACKBARS}>
                    <RouterProvider/>
                </SnackbarProvider>
            </LocalizationProvider>
        </RecoilRoot>
    </React.StrictMode>
);