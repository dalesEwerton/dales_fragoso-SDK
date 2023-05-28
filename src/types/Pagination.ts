/**
 * Represents pagination options for querying a list of items.
 */
export interface Pagination {
  /**
   * The maximum number of items to include per page.
   */
  limit?: number;

  /**
   * The page number to retrieve.
   */
  page?: number;

  /**
   * The offset from which to start retrieving items.
   */
  offset?: number;
}
