interface TransactionQuery {
  account?: string,
  after?: string,
  reference?: string,
}

interface AccountQuery {
  after?: string,
}

export {
  TransactionQuery,
  AccountQuery,
}