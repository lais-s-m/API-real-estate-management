import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import {
  ICategoryRequest,
  ICategoryResponse,
} from "../../interfaces/categories";

const createCategoryService = async (
  name: string
): Promise<ICategoryResponse> => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const categoryAlreadyExists = await categoryRepository.findOneBy({
    name,
  });

  if (categoryAlreadyExists) {
    throw new AppError("Category already exists", 400);
  }

  const category = categoryRepository.create({ name });
  await categoryRepository.save(category);
  return category;
};

export default createCategoryService;
