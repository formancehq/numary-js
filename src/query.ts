interface TransactionQuery {
  account?: string,
  source?: string,
  destination?: string,
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