
import express from 'express'
import * as WebSocket from 'ws';
import {notFoundMiddleware} from './middleware';
import {createHandyClient} from 'handy-redis'
import * as websocket from './websocket';
import { ModifiedWebsocket } from './types/cheeky';

const redis = createHandyClient();
const HTTP_PORT = process.env.HTTP_PORT || 8080;
const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 8081;

// Express Server
const expressApp = express();
expressApp.get('/ping', (_req: any, res: any) => { res.status(200).send('pong') });
expressApp.use(notFoundMiddleware)
expressApp.listen(Number(HTTP_PORT));
console.log('Express now listening on port', HTTP_PORT);

// Websocket Server
const websocketApp = new WebSocket.Server({ port: Number(WEBSOCKET_PORT) });
console.log('Websocket Server now listening on port', WEBSOCKET_PORT);
websocketApp.on('connection', (ws: ModifiedWebsocket) => websocket.connectionHandler(redis, ws));

// Cleanup dead WS connections...
setInterval(function ping() {
  websocketApp.clients.forEach(function each(ws: ModifiedWebsocket) {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping(noop);
  });
}, 30000);


const noop = () => {}
