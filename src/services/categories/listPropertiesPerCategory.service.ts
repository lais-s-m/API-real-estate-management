import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";

const listPropertiesPerCategoryService = async (categoryId: string) => {
  const categoryRepository = AppDataSource.getRepository(Categories);
  const category = await categoryRepository.findOneBy({ id: categoryId });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const listProperties = await categoryRepository.findOne({
    where: {
      id: categoryId,
    },
    relations: {
      properties: true,
    },
  });
  return { properties: listProperties!.properties!, name: category.name };
};

export default listPropertiesPerCategoryService;
