import { router } from ".";
import { getSurfaceError } from "../middleware/errorHandler";
import { ModifiedWebsocket } from "../types/cheeky";
import Redis from "ioredis";
import {closeHandler} from '.'

export function connectionHandler (ws: ModifiedWebsocket, req: any){
  console.log(req.headers)
  console.log(`New Connection. Connection ID: ${ws.id}.`)
  ws.isAlive = true;
  ws.pub = new Redis();
  ws.sub = new Redis();
  ws.sub.psubscribe('ws:')
  ws.on('pong', heartbeat);
  ws.send(JSON.stringify({ body: 'Connected. Welcome to Cheeky.', }));
  ws.on('message', (msg) => receiveMessageFromUser(ws, String(msg)));
  ws.sub.on('pmessage', (_pattern, channel, msg) => sendMessageToUser(ws, channel, msg))
  ws.on('close', closeHandler);
}

const heartbeat = () =>  {this.isAlive = true;}
const sendMessageToUser = async  (ws, channel, msg: string) => {
  console.log('Sending to user ->', {channel, msg})
  ws.send(msg)
}

const receiveMessageFromUser = async (ws, msg: string) => {
  try {
    const {channel, message} = await router(ws, msg);
    await ws.pub.publish(`ws:${channel}`, message)
  } catch (e) {
    const surfaceError = getSurfaceError(e);
    ws.send(JSON.stringify(surfaceError))
  }
}