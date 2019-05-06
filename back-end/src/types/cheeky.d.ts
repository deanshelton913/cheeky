import WebSocket from 'ws';
import { Redis } from 'ioredis';

interface ModifiedWebsocket extends WebSocket {
  isAlive: boolean;
  id: string;
  pub: Redis;
  sub: Redis;
}

type Gender = 'MALE' | 'FEMALE' | 'ALL_GENDERS' | 'NON_BINARY';

type Units = 'm' | 'km' | 'mi' | 'ft';
