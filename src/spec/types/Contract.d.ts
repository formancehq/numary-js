export interface Contract {
  account?: string;
  expr: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
