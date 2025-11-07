import {RouterProvider as ReactRouterProvider} from "react-router-dom";
import {router} from "../../routes";
import {type ReactElement} from "react";

/**
 * RouterProvider
 *
 * This component wraps the `ReactRouterProvider` from `react-router-dom` and provides
 * the application's routing configuration. It uses the `router` object defined in the
 * `../../routes` module to manage navigation and route handling.
 *
 * @returns {ReactElement} The `ReactRouterProvider` component with the configured router.
 */
export const RouterProvider = (): ReactElement => {
    return <ReactRouterProvider router={router} />;
};
