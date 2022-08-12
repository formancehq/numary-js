# Formance Typescript SDK

This repository contains the Formance (fka Numary) Typescript SDK for NodeJS.

## Installation

```SHELL
yarn add numary
```

## Usage

```typescript
import Cluster from "numary";

const cluster = new Cluster({
  uri: 'http://localhost:3068',
});

const ledger = cluster.getLedger('some-ledger');

(async () => {
  const r = await ledger.getTransactions();

  for (const tx of r.data) {
    console.log(tx);
  }
})();
```

## Using Formance Cloud

```typescript
import Cluster from "numary";

const cluster = new Cluster({
  // find your cloud endpoint at https://my.numary.cloud/organization
  uri: 'https://your-cloud-endpoint.o.numary.cloud',
  cloud: {
    // create an API key at https://my.numary.cloud/connectors
    key: 'YOUR_API_KEY',
  },
});

const ledger = cluster.getLedger('some-ledger');

(async () => {
  const r = await ledger.getTransactions();

  for (const tx of r.data) {
    console.log(tx);
  }
})();
```

## Using `bigint` numbers

This SDK uses `json-bigint` under the hood to parse and encode requests; with transactions postings amount accepting and returning either a `number` or a `bigint` type depending on the integer size.

```typescript
(async () => {
 await ledger.commit({
    postings: [
      {
        source: 'world',
        destination: 'deposits',
        amount: 1234123412341234123412341234123412341234123412341234123412341234123412341234n,
        asset: 'USD/2',
      },
      {
        source: 'world',
        destination: 'deposits',
        amount: 100,
        asset: 'USD/2',
      }
    ],
  });

  const res = await ledger.getTransactions();

  for (const posting of res.data[0].postings) {
    console.log(`${typeof posting.amount}: ${posting.amount}`);
    // will print:
    // bigint: 1234123412341234123412341234123412341234123412341234123412341234123412341234
    // number: 100
  }
})();
```

## Advanced options

Axios interceptors can be used on the underlying cluster connection, e.g. to add authentication headers:

```typescript
const cluster = new Cluster({
  uri: 'http://example.com:3068',
});

cluster.conn.interceptors.request.use(config => {
  config.headers['Authorization'] = `Basic Zm9vOmJhcg==`;

  return config;
});
```
