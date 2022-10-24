import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { IUser, IUserRequest } from "../../interfaces/user.interfaces";
import { hash } from "bcrypt";
import { createUserSchemaResponse } from "../../schemas/user.schemas";

const createUserService = async ({
  name,
  email,
  isAdm,
  password,
}: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    isAdm,
    password: hashedPassword,
  });
  await userRepository.save(user);

  return await createUserSchemaResponse.validate(user, {
    stripUnknown: true,
  });
};

export default createUserService;