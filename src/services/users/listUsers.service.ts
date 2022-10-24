import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { IUser } from "../../interfaces/users";

const listUsersService = async (): Promise<IUser[]> => {
  const userRespository = AppDataSource.getRepository(User);
  const users = await userRespository.find();

  let treatedUsers: IUser[] = [];
  users.forEach((user) => {
    const treated = {
      id: user.id,
      isActive: user.isActive,
      isAdm: user.isAdm,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    treatedUsers.push(treated);
  });

  return treatedUsers;
};

export default listUsersService;
