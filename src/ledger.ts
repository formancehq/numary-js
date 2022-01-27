import { Account, AccountSummary } from "./account";
import Cluster from "./cluster";
import Cursor from "./cursor";
import { Transaction, TransactionRequest } from "./schema";
import { TransactionQuery } from './query';

class Ledger {
  name: string;
  cluster: Cluster;

  constructor(cluster : Cluster, name : string) {
    this.name = name;
    this.cluster = cluster;
  }

  async getAccounts() : Promise<Cursor<AccountSummary>> {
    const res = await this.cluster.conn.get(`/${this.name}/accounts`);
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

  async execute(script: string, vars: object) : Promise<any> {
    const res = await this.cluster.conn.post(`/${this.name}/script`, {
      plain: script,
      vars,
    });

    return res.data;
  }

  async batch(transactions: TransactionRequest[]) : Promise<Transaction[]> {
    const res = await this.cluster.conn.post(`/${this.name}/transactions/batch`, {
      transactions,
    });

    return res.data.data;
  }
}

export default Ledger;