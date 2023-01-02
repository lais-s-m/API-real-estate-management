import { IProperty } from "../properties";
import { IUser } from "../users";

export interface IScheduleRequest {
  userId: string;
  propertyId: string;
  date: string;
  hour: string;
}

export interface ISchedule {
  id: string;
  date: string;
  hour: string;
  property: IProperty;
  user: IUser;
}

export interface IScheduleUpdate {
  userId?: string;
  propertyId?: string;
  date?: string;
  hour?: string;
}
