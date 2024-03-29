import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id,
  });
  if (!findUser) {
    throw new AppError("User not found", 404);
  }
  if (findUser.isActive === false) {
    throw new AppError("User is already deleted", 400);
  }

  await userRepository.update(id, {
    isActive: false,
  });
};

export default deleteUserService;
