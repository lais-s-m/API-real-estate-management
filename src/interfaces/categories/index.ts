import { IProperty } from "../properties";

export interface ICategoryRequest {
  name: string;
}

export interface ICategoryResponse {
  id: string;
  name: string;
}

export interface ICategoryProperty extends ICategoryResponse {
  properties: IProperty[];
}
