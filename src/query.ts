interface PaginatedQuery {
  pagination_token?: string,
  page_size?: number,
  after?: string,
}

interface TransactionQuery extends PaginatedQuery {
  account?: string,
  source?: string,
  destination?: string,
  reference?: string,
  start_time?: string,
  end_time?: string,
  [key: string]: any,
}

interface AccountQuery {
  address?: string,
  balance?: number,
  balance_operator?: string,
  [key: string]: any,
}

export {
  TransactionQuery,
  AccountQuery,
  PaginatedQuery,
}