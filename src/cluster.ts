import axios, { AxiosBasicCredentials, AxiosInstance } from "axios";
import { Cloud, CloudOpts } from "./cloud";
import { Info } from "./info";
import Ledger from "./ledger";

interface ClusterOpts {
  uri?: string;
  auth?: AxiosBasicCredentials;
  cloud?: CloudOpts;
}

class Cluster {
  conn: AxiosInstance;

  constructor(opts: ClusterOpts) {
    let baseURL = opts.uri || "http://localhost:3068";
    
    if (opts.cloud) {
      baseURL = 'https://api.numary.cloud/ledger';
    }

    this.conn = axios.create({
      baseURL,
      auth: opts.auth,
    });

    if (opts.cloud) {
      this.conn.interceptors.request.use(Cloud(opts.cloud));
    }
  }

  async getInfo() : Promise<Info> {
    const res = await this.conn.get('/_info');

    return {
      server: res.data.data["server"],
      version: res.data.data["version"],
      ledgers: res.data.data["config"]["storage"]["ledgers"],
      config: res.data.data["config"],
    }
  }

  getLedger(name: string) : Ledger {
    return new Ledger(this, name);
  }
}

export default Cluster;