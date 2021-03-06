import { FailureByDesign } from "../FailureByDesign";
import express from 'express';

interface SurfaceError {
  error: string;
  statusCode: number
}

/**
 * Error Handling Middleware
 * Purpose: Handle all surface errors in a single place.
 */
export default function globalErrorHandler(err: Error | FailureByDesign, _req: any, res: express.Response, _next: express.NextFunction){
  console.log('ERROR', err)
  const surfaceResponse = getSurfaceError(err);
  res.status(surfaceResponse.statusCode).send({ error: surfaceResponse.error })
}

/**
 * getSurfaceError
 * This is the only type of error that should ever surface to the users.
 */
export function getSurfaceError (err: Error | FailureByDesign) {
  if (isFailureByDesign(err)) {
    const code = err.code
    const codeStatusMap = {
      'BAD_REQUEST': 400,
      'UNAUTHORIZED': 401,
      'NOT_FOUND': 404,
      'MISCONFIGURATION': 500
    } as {[key: string]: number}

    const httpStatusCode = codeStatusMap[code]
    if(!httpStatusCode) console.error(`FailureByDesign thrown with unknown status code. ${code}`)

    return {
      error: err.message || 'Something unexpected happened.',
      statusCode: httpStatusCode || 500
    } as SurfaceError;
  }

  console.error('UNEXPECTED ERROR:', err.message, err.stack)

  return {
    error: `Good job! This is a pretty embarrasing error. 500 level erros should never happen in prod.
    Look; This should be rare, and we are sorry your experience has been affected.
    Good/bad news: this is probably raising alarms that are freaking out the dev team.
    If you know what you did to get this error, please record the reproduction steps and send them to the support team.
    You might even get a reward! We are hoping that you can be part of the solution to this problem.
    Apologies once again,
    Thank you for your understanding.
    - Cheeky Dev Team

      p.s.: If you are a hacker; I pay bug bounties.
      - Dean Shelton.
    `,
    statusCode:  500
  } as SurfaceError;
}

/**
 * Typescript guard
 * Purpose: help intellisense.
 */
const isFailureByDesign = (err: any): err is FailureByDesign => {
  return err instanceof FailureByDesign
}

