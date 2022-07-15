import axios, { AxiosRequestConfig } from "axios";

export interface CloudOpts {
  key?: string;
  sandbox?: boolean;
}

export function Cloud(opts: CloudOpts) {
  let token = {
    value: '',
    expired: true,
    created: 0,
  };

  const hydrateToken = async () => {
    if (new Date().getTime() >= (token.created + 30 * 60 * 1000)) {
      token.expired = true;
    }

    if (token.value && !token.expired) {
      return;
    }

    const res = await axios.post(`https://api${opts.sandbox ? '.staging' : ''}.numary.cloud/auth/authenticate/tokens`, {
      strategy: 'm2m',
      token: opts.key,
    });

    token.value = res.data.data.jwt;
    token.expired = false;
    token.created = new Date().getTime();
  }

  return async (config: AxiosRequestConfig) => {
    if (config.url?.match(/\/auth\/authenticate\/tokens$/)) {
      return config;
    }

    await hydrateToken();

    config.headers['Authorization'] = `Bearer ${token.value}`;
  
    return config;
  }
} 