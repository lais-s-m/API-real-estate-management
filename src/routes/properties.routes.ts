import { Router } from "express";
import {
  createPropertyController,
  deletePropertyController,
  listPropertiesController,
  updatePropertyController,
} from "../controllers/properties.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const propertyRoutes = Router();

//Create
propertyRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createPropertyController
);

//Update
propertyRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  updatePropertyController
);

//Read
propertyRoutes.get("", listPropertiesController);

//Delete
propertyRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  deletePropertyController
);

export default propertyRoutes;
