export interface Info {
  server: string;
  version: string;
  config: {
    [k: string]: {
      [k: string]: unknown;
    };
  };
  ledgers: string[];
}
