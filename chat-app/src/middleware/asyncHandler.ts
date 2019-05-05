import express = require("express");


const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return Promise
      .resolve(fn(req, res, next))
      .catch(next)
}

export default asyncHandler;