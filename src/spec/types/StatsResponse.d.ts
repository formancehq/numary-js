export interface StatsResponse {
  data: Stats;
  [k: string]: unknown;
}
export interface Stats {
  accounts: number;
  transactions: number;
  [k: string]: unknown;
}
