import { Validator } from "../Validator";
import * as handler from "../handlers"
export async function router(redis, msg) {
  const { code, parameters } = Validator.validateWebsocketMessage(String(msg))
  return {
    ROOM_CREATE: handler.roomCreate,
    ROOM_SUBSCRIBE: handler.roomSubscribe,
    ROOM_KICK_USER: handler.roomKickUser,
  }[code](redis, parameters);
}