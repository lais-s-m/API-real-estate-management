import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { hash } from "bcryptjs";
import { createUserSchemaResponse } from "../../schemas/user.schemas";
import { IUser, IUserRequest } from "../../interfaces/users";
import { AppError } from "../../errors/appError";

const createUserService = async ({
  name,
  email,
  isAdm,
  password,
}: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const emailAlreadyExists = await userRepository.findOneBy({
    email,
  });

  if (emailAlreadyExists) {
    throw new AppError(
      "There is already an account with this email address",
      400
    );
  }

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
