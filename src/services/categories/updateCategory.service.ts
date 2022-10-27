import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import { ICategoryResponse } from "../../interfaces/categories";

const updateCategoryService = async (
  name: string,
  id: string
): Promise<ICategoryResponse> => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const findCategory = await categoryRepository.findOneBy({
    id,
  });

  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }

  await categoryRepository.update(id, {
    name: name,
  });

  const category = await categoryRepository.findOneBy({
    id,
  });

  return category!;
};

export default updateCategoryService;
