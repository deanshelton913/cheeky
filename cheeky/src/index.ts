
import express from 'express'
import * as WebSocket from 'ws';
import {notFoundMiddleware, errorHandler} from './middleware';
import * as handler from './handlers'
import * as websocket from './websocket';
import { ModifiedWebsocket } from './types/cheeky';
import asyncMiddleware from './middleware/asyncHandler';
import { FailureByDesign } from './FailureByDesign';
import passport from 'passport'
import FacebookStrategy from 'passport-facebook';


// parse application/x-www-form-urlencoded
const HTTP_PORT = process.env.HTTP_PORT || 8080;
const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 8081;

// Express Server
const expressApp = express();
expressApp.set('views', __dirname + '/views');
expressApp.set('view engine', 'jsx');
expressApp.use(require('cookie-parser')());
expressApp.use(require('express-session')({ secret: 'sea hot dog is not worth it', resave: true, saveUninitialized: true }));
expressApp.use(passport.initialize());
expressApp.use(passport.session());
expressApp.use(require('body-parser').json())

// Passport JS Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: '2160906307324498',
    clientSecret: 'd2230edee815a3799a06f54db515d46c',
    callbackURL: "http://localhost:8080/auth/facebook/callback"
  },(_accessToken, _refreshToken, profile, cb) => { cb(null, profile.id); }
));

// Passportjs serialize/deserialize user
passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(user, done) { done(null, user); });

// Authentication Handler-Wrapper
const facebookAuthenticated = passport.authenticate('facebook', { failureRedirect: '/#fail' })

// Auth Routes
expressApp.get('/auth/facebook', passport.authenticate('facebook'));
expressApp.get('/auth/facebook/callback', facebookAuthenticated, function(_req, res) { res.redirect('/#welcome'); });

// UI Routes
// expressApp.get('/', (_req: any, res) => {
//   res.sendFile(__dirname + '/views/index.html')
// });
expressApp.use(require('serve-static')(__dirname + '/../../static'));
expressApp.set('views', __dirname + '/views');
expressApp.set('view engine', 'jsx');
var options = { beautify: true };
expressApp.engine('jsx', require('express-react-views').createEngine(options));
expressApp.get('/', require('./routes').index);

expressApp.get('/api/ping', (_req: any, res: any) => { res.status(200).send('pong') });
expressApp.get('/api/channel', asyncMiddleware(handler.channelList));
expressApp.post('/api/user', asyncMiddleware(handler.userCreate));
expressApp.post('/api/channel', asyncMiddleware(handler.channelCreate));

// Not-Found (404) Middleware
expressApp.use(notFoundMiddleware)

// Start the app
expressApp.listen(Number(HTTP_PORT));
console.log('Express now listening on port', HTTP_PORT);


// Global Error Handler
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