import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { hash } from "bcrypt";
import { IUserUpdate } from "../../interfaces/users";
import { AppError } from "../../errors/appError";

const updateUserService = async (
  data: IUserUpdate,
  id: string,
  userId: string,
  isAdm: boolean
): Promise<User | Array<string | number>> => {
  if (!isAdm) {
    if (userId !== id) {
      throw new AppError("Unauthorized", 401);
    }
  }
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }
  const keys = Object.keys(data);
  if (
    keys.includes("id") ||
    keys.includes("isAdm") ||
    keys.includes("isActive")
  ) {
    throw new AppError("You can't update these values", 401);
  }
  await userRepository.update(id, {
    name: data.name ? data.name : findUser.name,
    email: data.email ? data.email : findUser.email,
    password: data.password ? await hash(data.password, 10) : findUser.password,
  });

  const user = await userRepository.findOneBy({
    id,
  });

  return user!;
};
export default updateUserService;
