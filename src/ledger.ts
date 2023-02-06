import { Account, AccountSummary } from "./account";
import Cluster from "./cluster";
import Cursor from "./cursor";
import { Transaction, TransactionRequest } from "./transaction";
import { AccountsQuery, PaginatedQuery, TransactionQuery } from './query';
import { Stats as BaseStats } from "./spec/types/Stats";
import { ScriptResult as BaseScriptExecResult } from "./spec/types/ScriptResult";
import { Metadata } from "./spec/types/Metadata";

interface Stats extends BaseStats {}
interface ScriptExecResult extends BaseScriptExecResult {}

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

  async getAccounts(query?: AccountsQuery) : Promise<Cursor<AccountSummary>> {
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

  async getBalances(query?: {
    address?: string,
    [key: string]: any,
  } & PaginatedQuery) : Promise<Cursor<any>> {
    const res = await this.cluster.conn.get(`/${this.name}/balances`, {
      params: query,
    });

    return res.data.cursor;
  }

  async aggregateBalances(query?: {
    address?: string,
    [key: string]: any,
  }) : Promise<{
    [asset: string]: number,
  }> {
    const res = await this.cluster.conn.get(`/${this.name}/aggregate/balances`, {
      params: query,
    });

    return res.data.data;
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

  async revert(txid: string) : Promise<Transaction> {
    const res = await this.cluster.conn.post(`/${this.name}/transactions/${txid}/revert`);
    return res.data.data;
  }

  async execute(
    script: string,
    vars: object,
    options?: {
      preview?: boolean,
      reference?: string,
      metadata?: Metadata,
    }
  ) : Promise<ScriptExecResult> {
    const res = await this.cluster.conn.post(`/${this.name}/script`, {
      plain: script,
      vars,
      ...options,
    }, {
      params: {
        preview: options?.preview,
      },
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