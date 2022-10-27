import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { SchedulesUserProperties } from "../../entities/schedulesUserProperties.entity";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { ISchedule, IScheduleRequest } from "../../interfaces/schedules";

const createScheduleService = async (
  data: IScheduleRequest
): Promise<ISchedule> => {
  const { date, hour, propertyId, userId } = data;

  const treatedDate = new Date(date);
  const dayOfTheWeek = treatedDate.getDay();
  if (dayOfTheWeek === 0 || dayOfTheWeek === 6) {
    throw new AppError(
      "Scheduling visits is restricted to weekdays (Monday-Friday)",
      400
    );
  }

  const treatedHour = Number(hour.replace(":", "."));
  if (treatedHour < 8 || treatedHour > 18) {
    throw new AppError("The schedule of visits is from 8 am to 6 pm", 400);
  }

  const propertyRespository = AppDataSource.getRepository(Properties);
  const findProperty = await propertyRespository.findOneBy({ id: propertyId });

  if (!findProperty) {
    throw new AppError("Invalid property Id", 404);
  }

  const scheduleRepository = AppDataSource.getRepository(
    SchedulesUserProperties
  );
  const isScheduleNotPossible = await scheduleRepository.findOneBy({
    date,
    hour,
    // property: findProperty!,
  });
  if (isScheduleNotPossible) {
    throw new AppError("there is already a visit at this time", 400);
  }

  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id: userId });

  const newSchedule = scheduleRepository.create({
    date,
    hour,
    property: findProperty!,
    user: findUser!,
  });
  await scheduleRepository.save(newSchedule);

  return newSchedule;
};

export default createScheduleService;
