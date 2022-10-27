import { Request, Response } from "express";
import { ICategoryRequest } from "../interfaces/categories";
import createCategoryService from "../services/categories/createCategory.service";
import deleteCategoryService from "../services/categories/deleteCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listPropertiesPerCategoryService from "../services/categories/listPropertiesPerCategory.service";
import updateCategoryService from "../services/categories/updateCategory.service";

//Create
export const createCategoryController = async (req: Request, res: Response) => {
  const { name }: ICategoryRequest = req.body;
  const category = await createCategoryService(name);
  return res.status(201).json(category);
};

//Update
export const updateCategoryController = async (req: Request, res: Response) => {
  const { name }: ICategoryRequest = req.body;
  const id = req.params.id;
  const category = await updateCategoryService(name, id);
  return res.json(category);
};
//Read
export const listPropertiesPerCategoryController = async (
  req: Request,
  res: Response
) => {
  const categoryId = req.params.id;
  const properties = await listPropertiesPerCategoryService(categoryId);
  return res.json({
    id: categoryId,
    name: properties.name,
    properties: properties.properties,
  });
};

export const listCategoriesController = async (req: Request, res: Response) => {
  const categories = await listCategoriesService();
  return res.json(categories);
};

//Delete
export const deleteCategoryController = async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteCategoryService(id);
  return res.status(204).send();
};
