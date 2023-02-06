export interface AccountWithVolumesAndBalances {
  address: string;
  type?: string;
  metadata?: {
    [k: string]: unknown;
  };
  volumes?: {
    [k: string]: {
      [k: string]: number;
    };
  };
  balances?: {
    [k: string]: number;
  };
  [k: string]: unknown;
}
