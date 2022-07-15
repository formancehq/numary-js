interface TransactionQuery {
  account?: string,
  source?: string,
  destination?: string,
  reference?: string,
  start_time?: string,
  end_time?: string,
  after?: string,
  pagination_token?: string,
  page_size?: number,
  [key: string]: any,
}

interface AccountQuery {
  after?: string,
  address?: string,
  balance?: number,
  balance_operator?: string,
  pagination_token?: string,
  page_size?: number,
  [key: string]: any,
}

export {
  TransactionQuery,
  AccountQuery,
}