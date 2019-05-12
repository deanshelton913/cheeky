
import express from 'express'
import * as WebSocket from 'ws';
import {notFoundMiddleware, globalErrorHandler} from './middleware';
import * as websocket from './websocket';
import { ModifiedWebsocket } from './types/cheeky';
import { allowCrossDomain } from './middleware/crossDomain';
import { logRequests } from './middleware/logRequests';
import api from './router/api';

const HTTP_PORT = process.env.HTTP_PORT || 8080;
const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 8081;

// Express Server
const expressApp = express();
expressApp.use(require('cookie-parser')());
expressApp.use(logRequests);
expressApp.use(allowCrossDomain);
expressApp.get('/ping', (_req: any, res: any) => { res.status(200).send('pong') });
expressApp.use('/api', api);
expressApp.use(notFoundMiddleware);
console.log('Express now listening on port', HTTP_PORT);
expressApp.use(globalErrorHandler);
expressApp.listen(Number(HTTP_PORT));

// Websocket Server
const websocketApp = new WebSocket.Server({ port: Number(WEBSOCKET_PORT) });
console.log('Websocket Server now listening on port', WEBSOCKET_PORT);
websocketApp.on('connection', websocket.connectionHandler);

// Cleanup dead WS connections...
setInterval(function ping() {
  websocketApp.clients.forEach(function each(ws: ModifiedWebsocket) {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping(noop);
  });
}, 30000);


const noop = () => {}