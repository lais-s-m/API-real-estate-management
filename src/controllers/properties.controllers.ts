import { raw, Request, Response } from "express";
import { IPropertyRequest } from "../interfaces/properties";
import createPropertyService from "../services/properties/createProperty.service";
import listPropertiesService from "../services/properties/listProperties.service";

//Create
export const createPropertyController = async (req: Request, res: Response) => {
  const property: IPropertyRequest = req.body;
  const createdProperty = await createPropertyService(property);
  return res.status(201).json(createdProperty);
};

//Read
export const listPropertiesController = async (req: Request, res: Response) => {
  const properties = await listPropertiesService();
  return res.json(properties);
};

//Update
export const updatePropertyController = async (
  req: Request,
  res: Response
) => {};

//Delete
export const deletePropertyController = async (
  req: Request,
  res: Response
) => {};
