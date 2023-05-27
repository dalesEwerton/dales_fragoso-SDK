import { Pagination } from "../types/Pagination";
import { Query } from "../types/Query";
import { Sort } from "../types/Sort";
import { Filter } from "../types/Filter";

export class QueryParser {
  public static parse(queryParams: Query): string {
    let query = '?';
  
    if (queryParams.pagination) {
      query = query.concat(this.parsePagination(queryParams.pagination));
    }

    if (queryParams.sort) {
      query = query.concat(this.parseSort(queryParams.sort));
    }

    if (queryParams.filters && queryParams.filters.length > 0) {
      queryParams.filters.forEach((filter) => {
        query = query.concat(this.parseFilter(filter));
      });
    }

    if (query.length > 0) {
      query = query.slice(0, query.length - 1);
    }

    return query;
  }

  private static parsePagination(pag: Pagination): string {
    let paginationQuery = '';

    if (pag.limit && pag.limit > 0) {
      paginationQuery = paginationQuery.concat(`limit=${pag.limit}&`)
    }

    if (pag.offset && pag.offset >= 0) {
      paginationQuery = paginationQuery.concat(`offset=${pag.offset}&`);
    }

    if (pag.page && pag.page > 0) {
      paginationQuery = paginationQuery.concat(`page=${pag.page}&`);
    }

    return paginationQuery;
  }

  private static parseSort(sort: Sort) {
    return `sort=${sort.attribute}:${sort.order}&`;
  }

  private static parseFilter(filter: Filter) {
    let filterQuery = ''
    if (filter.comparator) {
      filterQuery = filterQuery.concat(
        filter.comparator.attribute,
        filter.comparator.operation,
        String(filter.comparator.value),
        '&'
      )
    }

    if (filter.exists) {
      filterQuery = filter.exists.negate ? 
        filterQuery.concat('!', filter.exists.attribute, '&') :
        filterQuery.concat(filter.exists.attribute, '&');
    }

    if (filter.include) {
      filterQuery = filterQuery.concat(
        filter.include.attribute,
        filter.include.operation,
        filter.include.values.join(','),
        '&'
      )
    }

    if (filter.match) {
      filterQuery = filterQuery.concat(
        filter.match.attribute,
        filter.match.operation,
        filter.match.value,
        '&'
      )
    }

    if (filter.regex) {
      const operation = filter.regex.negate ? '!=' : '=';
      filterQuery = filterQuery.concat(
        filter.regex.attribute,
        operation,
        filter.regex.expression,
        '&'
      )
    }

    return filterQuery;
  }
}
