import { DataAccess } from "../data-access/RedisConnection";
import shortid from 'shortid';
import { Gender, Units } from "../types/cheeky";

// shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#');

const GEO_REDIS_KEY = 'ws:channels:geo';

export class Channel extends DataAccess {
  public gender: Gender;
  public units: Units;
  public lat: number;
  public lon: number;
  public radius: number;
  public id: string;
  public owner: string;

  constructor(gender: Gender, radius: number, units: Units, lat: number, lon: number, owner: string, id: string = null) {
    super();
    this.id = id || shortid.generate();
    this.gender = gender;
    this.radius = radius;
    this.lat = lat;
    this.lon = lon;
    this.units = units;
    this.owner = owner;
  }

  public static async getById(uniqueId: string) {
    const storageAddress = Channel.getStorageAddress(uniqueId);
    const {gender, radius, lat, lon, owner, units, id} = await DataAccess.redis.hgetallAsync(storageAddress)
    return new Channel(gender, radius, units, lat, lon, owner, id);
  }

  public static async findByRadius(lat: number, lon: number, radius: number, units: Units) {
    const ids = await DataAccess.redis.georadiusAsync(GEO_REDIS_KEY, lon, lat, radius, units);
    return Promise.all(ids.map(async (id) => await Channel.getById(id)))

  }

  public async save() {
    const storageAddress = Channel.getStorageAddress(this.id);
    await DataAccess.redis.hmsetAsync(storageAddress, {
      gender: String(this.gender),
      radius: String(this.radius),
      units: String(this.units),
      lat: String(this.lat),
      lon: String(this.lon),
      owner: String(this.owner),
    });
    await DataAccess.redis.geoaddAsync(GEO_REDIS_KEY, this.lon, this.lat, this.id)
  }

  public async destroy() {
    const storageAddress = Channel.getStorageAddress(this.id);
    await DataAccess.redis.hdelAsync(storageAddress);
    await DataAccess.redis.zremAsync(GEO_REDIS_KEY, this.id)
  }

  public asDTO = () => ({
    id: this.id,
    gender: this.gender,
    radius: this.radius,
    lat: this.lat,
    lon: this.lon,
    units: this.units,
    owner: this.owner,
  });

  private static getStorageAddress = (id) => `ws:channel:${id}`;

}