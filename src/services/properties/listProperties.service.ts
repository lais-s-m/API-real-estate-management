import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { IProperty } from "../../interfaces/properties";

const listPropertiesService = async (): Promise<IProperty[]> => {
  const propertyRepository = AppDataSource.getRepository(Properties);

  const properties = await propertyRepository.find();

  return properties;
};

export default listPropertiesService;
