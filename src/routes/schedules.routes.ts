import { Router } from "express";
import {
  createScheduleController,
  listSchedulesController,
  listSchedulesPerPropertyController,
} from "../controllers/schedules.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const scheduleRoutes = Router();

//Create
scheduleRoutes.post("", ensureAuthMiddleware, createScheduleController);

//Update

//Read
scheduleRoutes.get(
  "/properties/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  listSchedulesPerPropertyController
);

scheduleRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  listSchedulesController
);

//Delete

export default scheduleRoutes;
