import { Validator } from "../Validator";
import * as handler from "../handlers"
import { FailureByDesign } from "../FailureByDesign";
import { ModifiedWebsocket } from "../types/cheeky";

export async function router(ws: ModifiedWebsocket, msg: string) {
  const { code, parameters } = Validator.validateWebsocketMessage(String(msg))
  const func = {
    ROOM_CREATE: handler.channelCreate,
    ROOM_SUBSCRIBE: handler.roomSubscribe,
    ROOM_KICK_USER: handler.roomKickUser,
  }[code];

  if(!func) throw new FailureByDesign('BAD_REQUEST', `"${code}" is not a valid code.`)
  return func(ws, parameters);
}