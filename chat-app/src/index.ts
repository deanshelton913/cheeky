
import express from 'express'
import * as WebSocket from 'ws';
import {notFoundMiddleware, errorHandler} from './middleware';
import * as handler from './handlers'
import * as websocket from './websocket';
import { ModifiedWebsocket } from './types/cheeky';
import asyncMiddleware from './middleware/asyncHandler';
import { FailureByDesign } from './FailureByDesign';

var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
const HTTP_PORT = process.env.HTTP_PORT || 8080;
const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 8081;

// Express Server
const expressApp = express();
expressApp.use(bodyParser.json())
expressApp.get('/ping', (_req: any, res: any) => { res.status(200).send('pong') });
expressApp.post('/channel', asyncMiddleware(handler.channelCreate));
expressApp.get('/channel', asyncMiddleware(handler.listChannels));
expressApp.use(notFoundMiddleware)
expressApp.listen(Number(HTTP_PORT));
console.log('Express now listening on port', HTTP_PORT);

expressApp.use((err: Error | FailureByDesign, _req: any, res: express.Response, _next: express.NextFunction) => {
  const surfaceResponse = errorHandler(err);
  res.status(surfaceResponse.statusCode).send({ error: surfaceResponse.error })
})


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