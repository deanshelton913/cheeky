import {Router} from 'express';
import asyncMiddleware from '../middleware/asyncHandler';
import { channelList, channelCreate, userCreate} from '../handlers';
import { authMiddleware } from '../middleware/auth';

const api = Router();
api.use(authMiddleware)
api.get('/channel', asyncMiddleware(channelList));
api.post('/user', asyncMiddleware(userCreate));
api.post('/channel', asyncMiddleware(channelCreate));

export default api;

