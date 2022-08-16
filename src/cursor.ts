interface Cursor<Type> {
  data : Array<Type>;
  has_more: boolean;
  page_size: number;
  previous?: string;
  next?: string;
}

export default Cursor;