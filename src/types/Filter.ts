/**
 * Represents a filter for querying data.
 */
export interface Filter {
  /**
   * Matches a specific attribute with a value using the specified operation.
   */
  match?: {
    attribute: string;
    operation: '=' | '!=';
    value: string;
  };

  /**
   * Includes values for a specific attribute using the specified operation.
   */
  include?: {
    attribute: string;
    values: string[];
    operation: '=' | '!=';
  };

  /**
   * Checks the existence of a specific attribute with an optional negation.
   */
  exists?: {
    attribute: string;
    negate: boolean;
  };

  /**
   * Matches a specific attribute with a regular expression using the specified operation.
   */
  regex?: {
    attribute: string;
    expression: string;
    negate: boolean;
  };

  /**
   * Compares a specific attribute with a value using the specified operation.
   */
  comparator?: {
    attribute: string;
    value: number;
    operation: '>' | '<' | '>=';
  };
}
