export interface Filter {
  match?: {
    attribute: string;
    operation: '=' | '!=';
    value: string;
  };
  include?: {
    attribute: string;
    values: string[];
    operation: '=' | '!=';
  };
  exists?: {
    attribute: string;
    negate: boolean;
  };
  regex?: {
    attribute: string;
    expression: string;
    negate: boolean;
  };
  comparator?: {
    attribute: string;
    value: number;
    operation: '>' | '<' | '>=';
  };
}
