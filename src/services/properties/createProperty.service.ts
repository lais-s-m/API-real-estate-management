import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import { IProperty, IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async (
  property: IPropertyRequest
): Promise<IProperty> => {
  const { city, district, state, zipCode, number } = property.address;

  if (zipCode.length > 8) {
    throw new AppError("Invalid zipCode", 400);
  }
  if (state.length > 2) {
    throw new AppError("Invalid state", 400);
  }

  const addressRepository = AppDataSource.getRepository(Addresses);
  const isAddressAlreadyBeingUsed = await addressRepository.findOneBy({
    city,
    district,
    state,
    zipCode,
    number,
  });
  if (isAddressAlreadyBeingUsed) {
    throw new AppError("This address is already being used", 400);
  }

  const address = addressRepository.create({
    city,
    district,
    state,
    zipCode,
    number,
  });
  await addressRepository.save(address);

  const propertyRepository = AppDataSource.getRepository(Properties);
  const { categoryId, size, value } = property;

  const categoryRepository = AppDataSource.getRepository(Categories);
  const findCategory = await categoryRepository.findOneBy({
    id: categoryId,
  });

  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }

  const newProperty = propertyRepository.create({
    size,
    value,
    address,
    category: findCategory!,
  });
  await propertyRepository.save(newProperty);

  return newProperty;
};

export default createPropertyService;
