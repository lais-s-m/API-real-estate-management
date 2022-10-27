import { ICategoryRequest, ICategoryResponse } from "../categories";

export interface IAddressRequest {
  district: string;
  zipCode: string;
  number?: string;
  city: string;
  state: string;
}

export interface IAddress extends IAddressRequest {
  id: string;
}

export interface IPropertyRequest {
  value: number;
  size: number;
  address: IAddressRequest;
  categoryId: string;
}

export interface IProperty extends Omit<IPropertyRequest, "categoryId"> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  sold: boolean;
  category: ICategoryResponse;
}
