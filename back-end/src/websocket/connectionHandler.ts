import { router } from ".";
import { errorHandler } from "../middleware";
import { ModifiedWebsocket } from "../types/cheeky";
import Redis from "ioredis";

export function connectionHandler (ws: ModifiedWebsocket){
  console.log(`New Connection. Connection ID: ${ws.id}.`)
  ws.isAlive = true;
  ws.pub = new Redis();
  ws.sub = new Redis();
  ws.on('pong', heartbeat);
  ws.send(JSON.stringify({ body: 'Connected. Welcome to Cheeky.', }));

  ws.on('message', (msg) => receiveMessageFromUser(ws, String(msg)));
  ws.sub.on('pmessage', (_pattern, channel, msg) => sendMessageToUser(ws, channel, msg))
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
    const surfaceError = errorHandler(e);
    ws.send(JSON.stringify(surfaceError))
  }
}