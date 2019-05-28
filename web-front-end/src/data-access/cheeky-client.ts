
const env = process.env.NODE_ENV as 'development' | 'production'

export default class CheekyClient {
  private fetch: Window['fetch'];
  private baseUrl: string;
  private logger: any;
  private facebookAccessToken: string;
  private facebookId: string;

  constructor(facebookAccessToken: string, facebookId: string, injected: any = {}){
    this.fetch = injected.fetch || window.fetch.bind(window);
    this.logger = injected.logger || console;
    this.baseUrl = cheekyServiceConfig[env].http;
    this.facebookAccessToken = facebookAccessToken;
    this.facebookId = facebookId;
  }

  public async getMyProfile() {
    return this.get(`/api/users/me`)
  }

  public async profileExists() {
    const result = await this.get(`/api/users/me/exists`)
    return (result.status === 200)
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

  private async makeRequest (method: string, path: string, body?: BodyInit) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.facebookId}:${this.facebookAccessToken}`,
    }
    const url = `${this.baseUrl}${path}`;
    this.logger.debug(`${method} -> ${url}`);
    const result = await this.fetch(url, { method, headers, body });
    this.logger.debug(`${method} <- ${result} ${url}`);
    return result;
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
