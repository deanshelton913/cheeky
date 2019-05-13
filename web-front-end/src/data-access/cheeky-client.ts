
import fetch from 'node-fetch';

const env = process.env.NODE_ENV as 'development' | 'production'
export default class CheekyClient {
  private fetch: any;
  private baseUrl: string;
  private logger: any;
  private facebookAccessToken: string;
  private facebookId: string;

  constructor(facebookAccessToken: string, facebookId: string, injected: any = {}){
    this.fetch = injected.fetch || fetch;
    this.baseUrl = cheekyServiceConfig[env].http;
    this.logger = injected.logger || console;
    this.facebookAccessToken = facebookAccessToken;
    this.facebookId = facebookId;
  }

  public async post(path: string, body: any) {
    return this.makeRequest('POST', path, body);
  }

  public async get(path: string) {
    return this.makeRequest('GET', path);
  }

  public async put(path: string, body: any) {
    return this.makeRequest('PUT', path, body);
  }

  public async delete(path: string) {
    return this.makeRequest('DELETE', path);
  }

  private async makeRequest (method: string, path: string, body?: object) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.facebookId}:${this.facebookAccessToken}`,
    }
    const url = `${this.baseUrl}${path}`
    this.logger.debug(`${method} -> ${url}`)
    const result = this.fetch(url, { method, body, headers });
    this.logger.debug(`${method} <- ${result.status} ${url}`);
  }
}

const cheekyServiceConfig: CheekyServiceConfig = {
  "development": {
    "http": "http://localhost:8080",
    "websocket": "http://localhost:8081"
  }
}

interface CheekyServiceConfig {
  [development:string]: {
    http: string;
    websocket: string;
  }
}
