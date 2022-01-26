interface Cursor<Type> {
  data : Array<Type>;
  has_more: boolean;
  page_size: number;
}

export default Cursor;