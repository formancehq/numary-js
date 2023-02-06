export interface Mapping {
  contracts: Contract[];
  [k: string]: unknown;
}
export interface Contract {
  account?: string;
  expr: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
