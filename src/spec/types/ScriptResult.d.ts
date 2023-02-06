export interface ScriptResult {
  details?: string;
  error_code?: "INTERNAL" | "INSUFFICIENT_FUND" | "COMPILATION_FAILED" | "NO_SCRIPT";
  error_message?: string;
  transaction?: {
    timestamp: string;
    postings: {
      amount: number;
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
          input: number;
          output: number;
          balance?: number;
          [k: string]: unknown;
        };
      };
    };
    postCommitVolumes?: {
      [k: string]: {
        [k: string]: {
          input: number;
          output: number;
          balance?: number;
          [k: string]: unknown;
        };
      };
    };
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface Metadata {
  [k: string]: unknown;
}
