import { router } from ".";
import { errorHandler } from "../middleware";
import { ModifiedWebsocket } from "../types/cheeky";

const uuid = require('uuid/v4');

export function connectionHandler (redis, ws: ModifiedWebsocket){
  ws.isAlive = true;
  ws.id = uuid()
  ws.on('pong', heartbeat);
  ws.on('message', async (msg) => {
    try {
      const surfaceResult = await router(redis, msg);
      ws.send(JSON.stringify(surfaceResult))
    } catch (e) {
      const surfaceError = errorHandler(e);
      ws.send(JSON.stringify(surfaceError))
    }
  })
}

const heartbeat = () =>  {this.isAlive = true;}
