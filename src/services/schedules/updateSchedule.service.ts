import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { SchedulesUserProperties } from "../../entities/schedulesUserProperties.entity";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { ISchedule, IScheduleUpdate } from "../../interfaces/schedules";

const updateScheduleService = async (
  data: IScheduleUpdate,
  scheduleId: string
): Promise<ISchedule> => {
  const { date, hour, propertyId, userId } = data;

  const propertyRespository = AppDataSource.getRepository(Properties);
  const findProperty = await propertyRespository.findOneBy({ id: propertyId });

  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id: userId });

  const scheduleRepository = AppDataSource.getRepository(
    SchedulesUserProperties
  );
  const findSchedule = await scheduleRepository.findOneBy({ id: scheduleId });
  if (!findSchedule) {
    throw new AppError("Schedule not found", 404);
  }

  await scheduleRepository.update(scheduleId, {
    date: date ? date : findSchedule.date,
    hour: hour ? hour : findSchedule.hour,
    property: findProperty ? findProperty : findSchedule.property,
    user: findUser ? findUser : findSchedule.user,
  });

  const schedule = await scheduleRepository.findOneBy({ id: scheduleId });

  return schedule!;
};

export default updateScheduleService;
