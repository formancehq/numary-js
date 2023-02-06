export interface Account {
  address: string;
  type?: string;
  metadata?: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
