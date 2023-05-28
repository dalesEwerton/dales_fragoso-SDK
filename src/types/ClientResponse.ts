import { Metadata } from './Metadata';

/**
 * Represents the response from a client request.
 *
 * @template T - The type of the response data.
 */
export interface ClientResponse<T> {
  /**
   * The data returned by the client request.
   */
  data: T;

  /**
   * The metadata associated with the client response.
   * It provides additional information about the response data.
   */
  meta?: Metadata;
}
