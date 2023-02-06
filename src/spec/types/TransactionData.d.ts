export interface TransactionData {
  timestamp?: string;
  postings: {
    amount: number;
    asset: string;
    destination: string;
    source: string;
    [k: string]: unknown;
  }[];
  reference?: string;
  metadata?: Metadata;
  [k: string]: unknown;
}
export interface Metadata {
  [k: string]: unknown;
}
