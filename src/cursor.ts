interface Cursor<Type> {
  data : Array<Type>;
  has_more: boolean;
  page_size: Number;
}

export default Cursor;