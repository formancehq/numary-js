export interface ConfigInfoResponse {
  data: ConfigInfo;
  [k: string]: unknown;
}
export interface ConfigInfo {
  config: Config;
  server: string;
  version: string;
  [k: string]: unknown;
}
export interface Config {
  storage: {
    driver: string;
    ledgers: string[];
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
