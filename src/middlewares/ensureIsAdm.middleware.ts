import { NextFunction, Request, Response } from "express";

const errorGETmethod = [
  "Unauthorized. You must have administrator permissions to list users.",
  403,
];
const errorDELETEmethod = [
  "Unauthorized. You must have administrator permissions to delete users.",
  403,
];
const errorPATCHmethod = [
  "Unauthorized. You must have administrator permissions to update other users.",
  401,
];

const ensureIsAdm = (
  isAdm: boolean,
  answer: (string | number)[],
  next: NextFunction,
  res: Response
) => {
  if (!isAdm) {
    return res.status(answer[1] as number).json({
      message: answer[0],
    });
  }
  next();
};

const ensureIsAdmMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdm = req.user.isAdm;
  const method = req.method;

  if (method === "GET") {
    ensureIsAdm(isAdm, errorGETmethod, next, res);
  }
  if (method === "DELETE") {
    ensureIsAdm(isAdm, errorDELETEmethod, next, res);
  }
};

export default ensureIsAdmMiddleware;
