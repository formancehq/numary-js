import axios, { AxiosBasicCredentials, AxiosInstance } from "axios";
import { Info } from "./info";
import Ledger from "./ledger";

interface ClusterOpts {
  uri?: string;
  auth?: AxiosBasicCredentials;
}

class Cluster {
  conn: AxiosInstance;

  constructor(opts: ClusterOpts) {
    this.conn = axios.create({
      baseURL: opts.uri || "http://localhost:3068",
      auth: opts.auth,
    });
  }

  async getInfo() : Promise<Info> {
    const res = await this.conn.get('/_info');

    return {
      server: res.data["server"],
      version: res.data["version"],
      ledgers: res.data["ledgers"],
      config: res.data["config"],
    }
  }

  getLedger(name: string) : Ledger {
    return new Ledger(this, name);
  }
}

export default Cluster;