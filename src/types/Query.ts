import { Pagination } from "./Pagination";
import { Sort } from "./Sort";
import { Filter } from "./Filter";

/**
 * Represents a query object used for filtering, sorting, and paginating data.
 */
export interface Query {
  /**
   * The pagination options for retrieving a specific page of data.
   */
  pagination?: Pagination;

  /**
   * The sorting options for ordering the returned data.
   */
  sort?: Sort;

  /**
   * An array of filter objects to apply to the data.
   */
  filters?: Filter[];
}
