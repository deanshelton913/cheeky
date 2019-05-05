import WebSocket from 'ws';

interface ModifiedWebsocket extends WebSocket {
  isAlive: boolean;
  id: string;
}
