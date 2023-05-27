import { Pagination } from "../../src/types/Pagination";
import { Filter } from "../../src/types/Filter";
import { Sort } from "../../src/types/Sort";
import { QueryParser } from "../../src/utils/QueryParser";

describe('QueryParser', () => {
  describe('parse', () => {
    it('should parse pagination query parameter correctly', () => {
      const pagination: Pagination = {
        limit: 10,
        offset: 20,
        page: 2,
      };

      const expectedQuery = '?limit=10&offset=20&page=2';
      const parsedQuery = QueryParser.parse({ pagination });

      expect(parsedQuery).toBe(expectedQuery);
    });

    it('should parse filters query parameters correctly', () => {
      const filters: Filter[] = [
        {
          comparator: {
            attribute: 'budgetInMillions',
            operation: '>=',
            value: 160,
          },
        },
        {
          exists: {
            attribute: 'name',
            negate: false,
          },
        },
        {
          include: {
            attribute: 'race',
            operation: '=',
            values: ['Hobbit', 'Human'],
          },
        },
      ];

      const expectedQuery = '?budgetInMillions>=160&name&race=Hobbit,Human';
      const parsedQuery = QueryParser.parse({ filters });

      expect(parsedQuery).toBe(expectedQuery);
    });

    it('should parse negated filters correctly', () => {
      const filters: Filter[] = [
        {
          exists: {
            attribute: 'name',
            negate: true,
          },
          regex: {
            attribute: 'race',
            expression: '/foot/i',
            negate: true,
          },
        },
      ];
      
      const expectedQuery = '?!name&race!=/foot/i';
      const parsedQuery = QueryParser.parse({ filters });

      expect(parsedQuery).toBe(expectedQuery);
    });


    it('should parse sorting query parameter correctly', () => {
      const sort: Sort = {
        attribute: 'name',
        order: 'asc',
      };

      const expectedQuery = '?sort=name:asc';
      const parsedQuery = QueryParser.parse({ sort });

      expect(parsedQuery).toBe(expectedQuery);
    });

    it('should return an empty string when no query parameters are provided', () => {
      const queryParams = {};
      const parsedQuery = QueryParser.parse(queryParams);

      expect(parsedQuery).toBe('');
    });
  });
});
