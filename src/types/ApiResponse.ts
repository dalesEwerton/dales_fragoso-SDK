/**
 * Represents the response from an API.
 *
 * @template T - The type of the response data.
 */
export interface ApiResponse<T> {
  /**
   * The array of documents or data returned by the API.
   */
  docs: T;

  /**
   * The total number of documents or data available.
   */
  total: number;

  /**
   * The maximum number of documents or data per page.
   */
  limit: number;

  /**
   * The current page number.
   */
  page: number;

  /**
   * The total number of pages available.
   */
  pages: number;
}
