export interface Config {
  storage: {
    driver: string;
    ledgers: string[];
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
