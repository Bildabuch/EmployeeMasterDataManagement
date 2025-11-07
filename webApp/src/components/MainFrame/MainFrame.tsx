import {Paper, Stack} from "@mui/material";
import {Outlet} from "react-router-dom";
import {Breadcrumbs} from "../Breadcrumbs";
import {type ReactElement} from "react";

/**
 * The `MainFrame` component serves as the main layout container for the application.
 * It uses Material-UI's `Stack` and `Paper` components to provide a structured layout
 * with spacing, padding, and defined dimensions. It includes a `Breadcrumbs` component
 * for navigation and an `Outlet` for rendering child routes.
 *
 * @returns {ReactElement} The rendered `MainFrame` component.
 */
export const MainFrame = (): ReactElement => {
    return <Stack spacing={2}
                  sx={{
                      padding: 2,
                      margin: 2,
                      height: theme => {
                          const padding = Number(theme.spacing(2).replace("px", ""));
                          return `calc(100vh - ${padding * 4}px)`
                      },
                      width: '60vw'
                  }}
                  component={Paper}>
        <Breadcrumbs/>
        <Stack flex={1} overflow="auto">
            <Outlet/>
        </Stack>
    </Stack>
};
