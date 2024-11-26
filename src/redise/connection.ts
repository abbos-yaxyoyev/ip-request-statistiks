import { createClient, RedisClientType } from "redis";
import { ENV } from "../common/config";

export class Redis {

  public readonly client: RedisClientType;


  constructor() {
    this.client = createClient({ url: ENV.REDIS.URL });
  }

  public async initialize(): Promise<Error | null> {
    try {
      await this.client.connect();
      return null;
    } catch (error) {
      return error;
    }
  }

  async set(key: string, data, ttl = null): Promise<void> {
    // ttl in seconds
    if (ttl) {
      await this.client.set(key, JSON.stringify(data), {
        EX: ttl
      });
      return;
    }
    await this.client.set(key, JSON.stringify(data));
  }

  async get<T>(key: string): Promise<T> {
    const res = await this.client.get(key);
    return res ? JSON.parse(res.toString()) : null;
  }

  async del(key) {

    let res = await this.client.del(key);
    return res;

  }

  async incr(key: string): Promise<number> {
    return await this.client.incr(key);
  }

}


export const redis = new Redis();