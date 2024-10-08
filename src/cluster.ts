import axios, { AxiosBasicCredentials, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Info } from "./info";
import Ledger from "./ledger";
import jsonbig from "json-bigint";

interface ClusterOpts {
  uri?: string;
  auth?: AxiosBasicCredentials;
}

class Cluster {
  conn: AxiosInstance;

  constructor(opts: ClusterOpts) {
    let baseURL = opts.uri || "http://localhost:3068";

    this.conn = axios.create({
      baseURL,
      auth: opts.auth,
    });

    const json = jsonbig({
      useNativeBigInt: true,
    });

    this.conn.interceptors.request.use((req: AxiosRequestConfig) : AxiosRequestConfig => {
      req.data = json.stringify(req.data);

      req.transformResponse = data => data;

      return req;
    });

    this.conn.interceptors.response.use((res : AxiosResponse) : AxiosResponse => {
      res.data = json.parse(res.data);
      return res;
    });
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