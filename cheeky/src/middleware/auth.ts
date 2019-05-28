import fetch from 'node-fetch';
import { FailureByDesign } from '../FailureByDesign';
import globalErrorHandler from './errorHandler';

export const authMiddleware = async (req, res, next) => {
  try {
    if(!req.headers || !req.headers.authorization) {
      throw new FailureByDesign('UNAUTHORIZED', 'Missing Facebook auth token')
    } else {
      const [userID, accessToken] = req.headers.authorization.split(' ')[1].split(':');
      const fbResponse = await fetch(`https://graph.facebook.com/${userID}?access_token=${accessToken}`)
      if(fbResponse.status === 200) {
        req.userID = userID;
        req.accessToken = accessToken;
        next();
      } else {
        throw new FailureByDesign('UNAUTHORIZED', 'Facebook token did not validate.');
      }
    }
  } catch (e) {
    globalErrorHandler(e, req, res, next)
  }
}