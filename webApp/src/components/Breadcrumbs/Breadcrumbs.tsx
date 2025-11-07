import {Breadcrumbs as MuiBreadcrumbs} from "@mui/material";
import {type ReactElement, useMemo} from 'react';
import {Breadcrumb, BreadcrumbProps} from "./Breadcrumb";
import {UIMatch, useMatches} from "react-router-dom";
import {RouteHandle} from "../../routes/RouteHandle";

/**
 * Breadcrumbs
 *
 * A React component that renders a breadcrumb navigation trail based on the current route matches.
 * It uses Material-UI's Breadcrumbs component for styling and structure.
 *
 * @returns {ReactElement} The rendered breadcrumb navigation trail.
 *
 * Implementation details:
 * - The `useMatches` hook is used to retrieve the current route matches.
 * - Each route match is checked for a `crumb` property in its `handle`.
 * - The `crumb` property is a function that generates breadcrumb props (`BreadcrumbProps`).
 * - The last breadcrumb in the trail is rendered as plain text, while others are rendered as links.
 */
export const Breadcrumbs = (): ReactElement => {
    const matches = useMatches() as UIMatch<unknown, RouteHandle>[];

    /**
     * Memoized list of breadcrumb props.
     * Filters the route matches to include only those with a `crumb` property in their `handle`.
     * Maps the `crumb` functions to their resulting `BreadcrumbProps`.
     */
    const crumbs = useMemo(() => {
        return matches.filter(match => match.handle?.crumb)
            .map(match => match.handle?.crumb?.(match))
            .filter(Boolean) as BreadcrumbProps[];
    }, [matches]);

    /**
     * Determines if the given index is the last index in the crumbs array.
     *
     * @param {number} index - The index to check.
     * @returns {boolean} True if the index is the last index, false otherwise.
     */
    const isLastIndexOfCrumbs = (index: number) => {
        return index === (crumbs.length - 1);
    }

    return <MuiBreadcrumbs aria-label="breadcrumb">
        {crumbs.map((crumb, index) => (
            <Breadcrumb key={crumb.to}
                        label={crumb.label}
                        to={isLastIndexOfCrumbs(index) ? undefined : crumb.to}/>
        ))}
    </MuiBreadcrumbs>
};
