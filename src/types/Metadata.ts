/**
 * Represents metadata associated with a response.
 */
export interface Metadata {
  /**
   * The total number of items.
   */
  total?: number;

  /**
   * The maximum number of items per page.
   */
  limit?: number;

  /**
   * The current page number.
   */
  page?: number;

  /**
   * The total number of pages.
   */
  pages?: number;
}
