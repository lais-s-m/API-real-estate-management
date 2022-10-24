import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id,
  });
  if (!findUser) {
    return ["User not found", 404];
  }
  if (findUser.isActive === false) {
    return ["User is already deleted", 400];
  }

  await userRepository.update(id, {
    isActive: false,
  });

  return ["User deleted with success", 204];
};

export default deleteUserService;
