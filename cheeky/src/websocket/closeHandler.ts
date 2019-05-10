import { ModifiedWebsocket } from "../types/cheeky";

export function closeHandler (ws: ModifiedWebsocket) {
  console.log(`Closed connection: ${ws.id}.`)
}
