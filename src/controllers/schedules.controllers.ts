import { Request, Response } from "express";
import { IScheduleRequest } from "../interfaces/schedules";
import createScheduleService from "../services/schedules/createSchedule.service";
import listSchedulesService from "../services/schedules/listSchedules.service";
import listSchedulesPerPropertyService from "../services/schedules/listSchedulesPerPropery.service";
import updateScheduleService from "../services/schedules/updateSchedule.service";

//Create
export const createScheduleController = async (req: Request, res: Response) => {
  const data: IScheduleRequest = req.body;
  const schedule = await createScheduleService(data);
  return res.status(201).json({
    message: "visit scheduled successfully",
    schedule: schedule,
  });
};
//Read
export const listSchedulesPerPropertyController = async (
  req: Request,
  res: Response
) => {
  const propertyId = req.params.id;
  const schedules = await listSchedulesPerPropertyService(propertyId);
  return res.json({ schedules: schedules });
};

export const listSchedulesController = async (req: Request, res: Response) => {
  const schedules = await listSchedulesService();
  return res.json(schedules);
};
//Update
export const updateScheduleController = async (req: Request, res: Response) => {
  const scheduleId = req.params.id;
  const data = req.body;
  const schedule = await updateScheduleService(data, scheduleId);
  return res.json({
    message: "schedule updated!",
    schedule: schedule,
  });
};

//Delete
export const deleteScheduleController = async (
  req: Request,
  res: Response
) => {};
