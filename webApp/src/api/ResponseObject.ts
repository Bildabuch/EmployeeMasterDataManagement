/**
 * Type representing a standardized response object.
 *
 * This type is a union of two possible states:
 * - Error state: `{ error: true; status: number; data: null }`
 * - Success state: `{ error: false; status: number; data: T }`
 *
 * @template T - The type of the data in the success state.
 */
export type ResponseObject<T> =
    | { error: true; status: number; data: null }
    | { error: false; status: number; data: T };