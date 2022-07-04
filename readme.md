# Formance Typescript SDK

This repository contains the Formance (fka Numary) Typescript SDK for Node.js, generated from `numary/ledger` types.

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

## Using Numary Cloud

```typescript
import Cluster from "numary";

const cluster = new Cluster({
  cloud: {
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
