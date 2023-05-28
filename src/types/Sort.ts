/**
 * Represents the sorting options for a query.
 */
export interface Sort {
  /**
   * The attribute or field to sort by.
   */
  attribute: string;

  /**
   * The sort order. Must be either "asc" for ascending or "desc" for descending.
   */
  order: "asc" | "desc";
}
