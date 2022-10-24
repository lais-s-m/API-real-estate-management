import { Request, Response } from "express";
import { ISessionRequest } from "../interfaces/sessions";
import createSessionService from "../services/sessions/createSession.service";

//Create
export const createSessionController = async (req: Request, res: Response) => {
  const { email, password }: ISessionRequest = req.body;
  const token = await createSessionService({ email, password });
  return res.json({ token });
};
