import {ResponseObject} from "./ResponseObject.ts";

/**
 * Creates a response object representing a server error (HTTP 500).
 *
 * This function returns a predefined `ResponseObject` with:
 * - `error: true`
 * - `status: 500`
 * - `data: null`
 *
 * @returns {ResponseObject<never>} A response object indicating a server error.
 */
export const create500ResponseObject = (): ResponseObject<never> => {
    return {
        error: true,
        status: 500,
        data: null
    };
}