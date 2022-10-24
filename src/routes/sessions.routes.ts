import { Router } from "express";
import { createSessionController } from "../controllers/sessions.controllers";

const sessionRouter = Router();

sessionRouter.post("", createSessionController);

export default sessionRouter;
