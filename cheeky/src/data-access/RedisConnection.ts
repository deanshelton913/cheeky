import redis, {RedisClient} from 'redis';
import * as Bluebird from 'bluebird';
import { Units } from '../types/cheeky';

Bluebird.promisifyAll(redis)

export interface PromisifiedRedis extends RedisClient {
  hmsetAsync: (namespace: string, obj: any) => Promise<any>
  hgetallAsync: (key: string) => Promise<any>
  geoaddAsync: (key: string, lon: number, lat:number, member: string) => Promise<any>
  georadiusAsync: (key: string, lon: number, lat:number, radius: number, units: Units) => Promise<any>
  hexistsAsync: (key: string, field: string) => Promise<any>
  hdelAsync: (key: string) => Promise<any>
  zremAsync: (key: string, member: string) => Promise<any>
}

export class DataAccess {
  public static redis = redis.createClient() as PromisifiedRedis;

}