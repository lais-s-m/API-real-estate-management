import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

const ensureIsAdmMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdm = req.user.isAdm;
  const method = req.method;

  if (!isAdm) {
    throw new AppError(
      "You must have administrator permissons to execute this action",
      403
    );
  }

  return next();
};

export default ensureIsAdmMiddleware;
