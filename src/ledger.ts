import { Account, AccountSummary } from "./account";
import Cluster from "./cluster";
import Cursor from "./cursor";
import { Transaction, TransactionRequest } from "./schema";
import { TransactionQuery } from './query';

interface Stats {
  transactions: number;
  accounts: number;
}

class Ledger {
  name: string;
  cluster: Cluster;

  constructor(cluster : Cluster, name : string) {
    this.name = name;
    this.cluster = cluster;
  }

  async getStats() : Promise<Stats> {
    const res = await this.cluster.conn.get(`/${this.name}/stats`);
    return res.data.data;
  }

  async getAccounts(query?: any) : Promise<Cursor<AccountSummary>> {
    const res = await this.cluster.conn.get(`/${this.name}/accounts`, {
      params: query,
    });
    
    return res.data.cursor;
  }

  async getAccount(address: string) : Promise<Account> {
    const res = await this.cluster.conn.get(`/${this.name}/accounts/${address}`);
    return res.data.data;
  }

  async getTransaction(txid: string) : Promise<Transaction> {
    const res = await this.cluster.conn.get(`/${this.name}/transactions/${txid}`);
    return res.data.data;
  }

  async getTransactions(query?: TransactionQuery) : Promise<Cursor<Transaction>> {
    const res = await this.cluster.conn.get(`/${this.name}/transactions`, {
      params: query,
    });

    return res.data.cursor;
  }

  async setTransactionMeta(txid: string, meta: object) {
    const res = await this.cluster.conn.post(`/${this.name}/transactions/${txid}/metadata`, meta);
    return res.data;
  }

  async setAccountMeta(address: string, meta: object) {
    const res = await this.cluster.conn.post(`/${this.name}/accounts/${address}/metadata`, meta);
    return res.data;
  }

  async commit(transaction: TransactionRequest) : Promise<Transaction> {
    const res = await this.cluster.conn.post(`/${this.name}/transactions`, transaction);
    return res.data.data[0];
  }

  async revert(txid: string) : Promise<object> {
    const res = await this.cluster.conn.post(`/${this.name}/transactions/${txid}/revert`);
    return res.data;
  }

  async execute(script: string, vars: object, preview?: boolean) : Promise<any> {
    interface execParams {
      preview? : string
    }

    const params : execParams = {};

    if (preview) {
      params['preview'] = '1';
    }

    const res = await this.cluster.conn.post(`/${this.name}/script`, {
      plain: script,
      vars,
    }, {
      params,
    });

    return res.data;
  }

  async getMapping() : Promise<Object> {
    const res = await this.cluster.conn.get(`/${this.name}/mapping`);
    return res.data.data;
  }

  async setMapping(mapping: object) : Promise<object> {
    const res = await this.cluster.conn.put(`/${this.name}/mapping`, mapping);
    return res.data.data;
  }

  async batch(transactions: TransactionRequest[]) : Promise<Transaction[]> {
    const res = await this.cluster.conn.post(`/${this.name}/transactions/batch`, {
      transactions,
    });

    return res.data.data;
  }
}

export default Ledger;