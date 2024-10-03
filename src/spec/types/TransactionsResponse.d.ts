export interface TransactionsResponse {
  data: {
    timestamp: string;
    postings: {
      amount: number | bigint;
      asset: string;
      destination: string;
      source: string;
      [k: string]: unknown;
    }[];
    reference?: string;
    metadata?: Metadata;
    txid: number;
    preCommitVolumes?: {
      [k: string]: {
        [k: string]: {
          input: number | bigint;
          output: number | bigint;
          balance?: number | bigint;
          [k: string]: unknown;
        };
      };
    };
    postCommitVolumes?: {
      [k: string]: {
        [k: string]: {
          input: number | bigint;
          output: number | bigint;
          balance?: number | bigint;
          [k: string]: unknown;
        };
      };
    };
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}
export interface Metadata {
  [k: string]: unknown;
}
