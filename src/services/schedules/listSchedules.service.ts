import AppDataSource from "../../data-source";
import { SchedulesUserProperties } from "../../entities/schedulesUserProperties.entity";

const listSchedulesService = async () => {
  const scheduleRepository = AppDataSource.getRepository(
    SchedulesUserProperties
  );
  const listSchedules = scheduleRepository.find({
    relations: {
      user: true,
    },
  });

  return listSchedules;
};

export default listSchedulesService;
