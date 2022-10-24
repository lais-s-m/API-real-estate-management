import { Request, Response } from "express";
import { ISessionRequest } from "../interfaces/session.interfaces";
import createSessionService from "../services/sessions/createSession.service";

//Create
export const createSessionController = async (req: Request, res: Response) => {
  try {
    const { email, password }: ISessionRequest = req.body;
    const token = await createSessionService({ email, password });
    return res.json({ token });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({
        message: error.message,
      });
    }
  }
};
