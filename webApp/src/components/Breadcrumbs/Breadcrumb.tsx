import {Link, Typography} from "@mui/material";
import {ReactElement} from "react";

/**
 * Props for the Breadcrumb component.
 *
 * @interface BreadcrumbProps
 *
 * @property {string} label
 *   The text to display for the breadcrumb.
 *
 * @property {string} [to]
 *   The URL the breadcrumb links to. If not provided, the breadcrumb is rendered as plain text.
 */
export interface BreadcrumbProps {
    label: string;
    to?: string;
}

/**
 * A React component that renders a breadcrumb item. If a `to` prop is provided, the breadcrumb
 * is rendered as a link. Otherwise, it is rendered as plain text.
 *
 * @param {BreadcrumbProps} props - The properties passed to the component.
 * @param {string} props.label - The text to display for the breadcrumb.
 * @param {string} [props.to] - The URL the breadcrumb links to.
 *
 * @returns {ReactElement} A breadcrumb item, either as a link or plain text.
 *
 * Usage:
 * - Use this component to display a single breadcrumb item.
 * - Combine multiple Breadcrumb components to create a breadcrumb navigation trail.
 */
export const Breadcrumb = (props: BreadcrumbProps): ReactElement => {
    const {label, to} = props;
    if (to) {
        return <Link underline="hover"
                     color="inherit"
                     href={to}>
            {label}
        </Link>
    }

    return <Typography sx={{color: 'text.primary'}}>
        {label}
    </Typography>
}