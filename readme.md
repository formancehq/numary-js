# Formance Typescript SDK

This repository contains the Typescript SDK for Formance Ledger (fka Numary) for Node.js, wrapping the automatic [generated](https://www.npmjs.com/package/@numaryhq/ledger-nodejs) API client with higher-level functionality.

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

Moved to [@formancehq/formance](https://www.npmjs.com/package/@formancehq/formance)

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
