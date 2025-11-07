import {ResponseObject} from "./ResponseObject.ts";
import {create500ResponseObject} from "./create500ResponseObject.ts";

/**
 * Creates a response object based on the provided `Response`.
 *
 * This function processes the `Response` object from a fetch call and returns
 * a standardized `ResponseObject` containing the status, error flag, and parsed data.
 *
 * @template T - The type of the data expected in the response.
 * @param {Response} response - The `Response` object from a fetch call.
 * @param mapDto Optional mapping function to transform the parsed JSON data into type `T`.
 * @returns {Promise<ResponseObject<T>>} A promise resolving to a `ResponseObject`:
 * - If the response is not OK (`response.ok === false`), the object will have:
 *   - `error: true`
 *   - `status`: The HTTP status code
 *   - `data: null`
 * - If the response is OK, the object will have:
 *   - `error: false`
 *   - `status`: The HTTP status code
 *   - `data`: The parsed JSON data of type `T`
 */
export const createResponseObject = async <T>(response: Response, mapDto?: (dto: any) => T): Promise<ResponseObject<T>> => {
    try {
        if (!response.ok) {
            return {
                error: true,
                status: response.status,
                data: null
            };
        }
        const data = await response.json();
        return {
            error: false,
            status: response.status,
            data: mapDto ? mapDto(data) : data
        }
    } catch (error) {
        console.error('Error creating response object:', error);
        return create500ResponseObject()
    }
}

