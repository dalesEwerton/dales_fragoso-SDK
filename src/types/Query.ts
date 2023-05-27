import { Pagination } from "./Pagination";
import { Sort } from "./Sort";
import { Filter } from "./Filter";

export interface Query {
  pagination?: Pagination,
  sort?: Sort,
  filters?: Filter[],
}