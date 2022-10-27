import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";

const deleteCategoryService = async (id: string) => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const category = await categoryRepository.findOneBy({
    id,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  await categoryRepository.delete(id);
};

export default deleteCategoryService;
