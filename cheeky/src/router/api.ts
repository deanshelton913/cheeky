import {Router} from 'express';
import asyncMiddleware from '../middleware/asyncHandler';
import { channelList, channelCreate, userCreate, userShowMe, userMeExists} from '../handlers';
import { authMiddleware } from '../middleware/auth';

const api = Router();
api.use(authMiddleware)
api.get('/channels', asyncMiddleware(channelList));
api.post('/users/me', asyncMiddleware(userCreate));
api.get('/users/me', asyncMiddleware(userShowMe));
api.get('/users/me/exists', asyncMiddleware(userMeExists));
// api.get('/user/:id', asyncMiddleware(userShow));
api.post('/channels', asyncMiddleware(channelCreate));

export default api;

