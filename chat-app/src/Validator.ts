import { FailureByDesign } from "./FailureByDesign";

export class Validator {

  public static validateWebsocketMessage = (msg: string) => {
    const {code, parameters} = Validator.parseJsonOrFail(msg);
    if(!code || !parameters) throw new FailureByDesign('BAD_REQUEST', 'Request must contain "code" and "parameters".');
    return {code, parameters};
  }

  public static parseJsonOrFail = (string: string) => {
    try {
      return JSON.parse(string)
    } catch (e) {
      throw new FailureByDesign('BAD_REQUEST', `Malformed JSON. ${string}`)
    }
  }
}