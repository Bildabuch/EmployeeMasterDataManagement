import {UIMatch} from "react-router-dom";
import {BreadcrumbProps} from "../components/Breadcrumbs/Breadcrumb";

/**
 * Interface representing a route handle, which can be used to define additional
 * properties or behaviors for specific routes in the application.
 */
export interface RouteHandle {
    /**
     * Optional function to generate breadcrumb properties for a given route match.
     *
     * @param match - The route match object provided by `react-router-dom`, which contains
     *                information about the current route, such as the URL and parameters.
     * @returns BreadcrumbProps - An object containing the properties required to render
     *                            a breadcrumb for the route.
     */
    crumb?: (match: UIMatch) => BreadcrumbProps;
}
