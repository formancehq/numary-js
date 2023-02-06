export interface Cursor {
  page_size: number;
  has_more?: boolean;
  previous?: string;
  next?: string;
  [k: string]: unknown;
}
