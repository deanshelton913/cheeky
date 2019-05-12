import fetch from 'node-fetch';
import { FailureByDesign } from "../FailureByDesign";

export const authMiddleware = (req, _res, next) => {
  console.log('PROTECTED HIT', req.headers)
  if(!req.headers || !req.headers.authorization) {
    throw new FailureByDesign('UNAUTHORIZED', 'Missing Facebook auth token')
  } else {
    const [id, token] = req.headers.authorization.split(' ');
    console.log(`FB -> https://graph.facebook.com/${id}/access_token=${token}`)
    fetch.get(`https://graph.facebook.com/${id}/access_token=${token}`)
      .then((x) => console.log('FB <- ', x))
      .then(() => next())
      .catch(console.error)
  }
}