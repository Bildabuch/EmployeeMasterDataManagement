import type {ReactElement, ReactNode} from 'react';
import {Stack, Typography} from "@mui/material";

/**
 * Props for the `PageHeader` component.
 *
 * @interface PageHeaderProps
 * @property {string} heading - The main heading text to display in the header.
 * @property {ReactNode} [actions] - Optional actions (e.g., buttons) to display on the right side of the header.
 */
export interface PageHeaderProps {
    heading: string;
    actions?: ReactNode;
}

/**
 * The `PageHeader` component renders a header section with a heading and optional actions.
 *
 * @param {PageHeaderProps} props - The props for the component.
 * @returns {ReactElement} The rendered `PageHeader` component.
 */
export const PageHeader = (props: PageHeaderProps): ReactElement => {
    const {heading, actions} = props;
    return <Stack direction="row"
                  justifyContent="space-between"
                  alignItems="center">
        <Typography variant="h4">{heading}</Typography>
        {actions}
    </Stack>
};
