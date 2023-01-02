import { Router } from "express";
import {
  createScheduleController,
  deleteScheduleController,
  listSchedulesController,
  listSchedulesPerPropertyController,
  updateScheduleController,
} from "../controllers/schedules.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const scheduleRoutes = Router();

//Create
scheduleRoutes.post("", ensureAuthMiddleware, createScheduleController);

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

//Update
scheduleRoutes.patch(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  updateScheduleController
);
//Delete
scheduleRoutes.delete(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  deleteScheduleController
);

export default scheduleRoutes;
