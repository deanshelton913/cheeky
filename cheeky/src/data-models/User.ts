import { DataAccess } from "../data-access/RedisConnection";
import { Gender } from "../types/cheeky";
import { FailureByDesign } from "../FailureByDesign";

// shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#');


export class User extends DataAccess {
  public name: string;
  public dob: number;
  public gender: Gender;
  public pictures: string[];
  public bio: string;
  public id: number;

  constructor(name: string, dob: number, pictures: string[], bio: string, id: number) {
    super();
    this.id = id;
    this.name = name;
    this.dob = dob;
    this.pictures = pictures;
    this.bio = bio;
  }

  public static async getById(uniqueId: string) {
    const storageAddress = User.getStorageAddress(uniqueId);
    const result = await DataAccess.redis.hgetallAsync(storageAddress);
    if(!result) throw new FailureByDesign('NOT_FOUND', 'User not found.')
    const {name, dob, pictures, bio, id} = result;
    return new User(name, dob, pictures, bio, id);
  }

  public static async exists(uniqueId: number) {
    const storageAddress = User.getStorageAddress(uniqueId);
    const result = await DataAccess.redis.hexistsAsync(storageAddress, 'id')
    return Boolean(result);
  }

  public async save() {
    const storageAddress = User.getStorageAddress(this.id);
    await DataAccess.redis.hmsetAsync(storageAddress, this.asDTO());
  }

  public async destroy() {
    const storageAddress = User.getStorageAddress(this.id);
    await DataAccess.redis.hdelAsync(storageAddress);
    // TODO: destroy pictures here
  }

  public asDTO = () => ({
    name: this.name,
    dob: this.dob,
    gender: this.gender,
    pictures: this.pictures,
    bio: this.bio,
    id: this.id,
  });

  private static getStorageAddress = (id) => `cheeky:user:${id}`;

}