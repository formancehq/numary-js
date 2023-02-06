export interface Script {
  /**
   * Reference to attach to the generated transaction
   */
  reference?: string;
  metadata?: Metadata;
  plain: string;
  vars?: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface Metadata {
  [k: string]: unknown;
}
