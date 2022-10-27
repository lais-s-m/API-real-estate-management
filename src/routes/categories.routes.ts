import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  listCategoriesController,
  listPropertiesPerCategoryController,
  updateCategoryController,
} from "../controllers/categories.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const categoryRoutes = Router();

//Create
categoryRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createCategoryController
);
//Update
categoryRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  updateCategoryController
);

//Read
categoryRoutes.get("/:id/properties", listPropertiesPerCategoryController);

categoryRoutes.get("", listCategoriesController);

//Delete
categoryRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  deleteCategoryController
);

export default categoryRoutes;
