import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";

const listSchedulesPerPropertyService = async (propertyId: string) => {
  const propertyRepository = AppDataSource.getRepository(Properties);

  const regexIsValidUUID =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  if (!regexIsValidUUID.test(propertyId)) {
    throw new AppError("Invalid id", 404);
  }

  const property = await propertyRepository.findOneBy({ id: propertyId });
  if (!property) {
    throw new AppError("Property not found", 404);
  }

  const listSchedules = await propertyRepository.findOne({
    where: {
      id: propertyId,
    },
    relations: ["schedules", "schedules.user"],
  });
  return listSchedules!.schedules!;
};

export default listSchedulesPerPropertyService;
