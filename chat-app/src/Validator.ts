import { FailureByDesign } from "./FailureByDesign";
import Ajv from 'ajv';
const ajv = new Ajv();

export class Validator {

  public static validateWebsocketMessage = (msg: string) => {
    const {code, parameters} = Validator.parseJsonOrFail(msg);
    if(!code || !parameters) throw new FailureByDesign('BAD_REQUEST', 'Request must contain "code" and "parameters".');
    return {code, parameters};
  }

  public static validateChannelCreate = (data: any) => {
    if(!ajv.validate(validateChannelCreateSchema, data)){
      throw new FailureByDesign('BAD_REQUEST', `Channel creation inputs are invalid. ${ajv.errorsText()}`);
    }
    const { gender, radius, lat, lon, units, owner } = data;
    return { gender, radius, lat, lon, units, owner };
  }

  public static validateChannelListQuery(data: any) {
    if(!ajv.validate(validateChannelListQuerySchema, data)) {
      throw new FailureByDesign('BAD_REQUEST', `Channel list query is invalid. ${ajv.errorsText()}`);
    }
    const { gender, radius, lat, lon, units } = data;
    return { gender, radius, lat, lon, units };
  }

  public static parseJsonOrFail = (string: string) => {
    try {
      return JSON.parse(string)
    } catch (e) {
      throw new FailureByDesign('BAD_REQUEST', `Malformed JSON. ${string}`)
    }
  }
}

const validateChannelCreateSchema = {
  "properties": {
    "gender": {
      "type": "string",
      "enum": ["MALE", "FEMALE", "ALL"]
    },
    "radius": { "type": "number" },
    "lat": { "type": "number" },
    "lon": { "type": "number" },
    "units": { "type": "string", "enum": ["m","km","mi","ft"] },
    "owner": { "type": "string" },
  },
  "required": ["radius", "gender", "lat", "lon", "units", "owner"]
};

const validateChannelListQuerySchema = {
  "properties": {
    "gender": {
      "type": "string",
      "enum": ["MALE", "FEMALE", "ALL"]
    },
    "radius": { "type": "string" },
    "lat": { "type": "string" },
    "lon": { "type": "string" },
    "units": { "type": "string", "enum": ["m","km","mi","ft"] },
  },
  "required": ["radius", "gender", "lat", "lon", "units"]
};