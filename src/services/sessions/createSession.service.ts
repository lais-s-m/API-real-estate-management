import { compare } from "bcrypt";
import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import jwt from "jsonwebtoken";
import { ISessionRequest } from "../../interfaces/sessions";
import "dotenv/config";
import { AppError } from "../../errors/appError";

const createSessionService = async ({
  email,
  password,
}: ISessionRequest): Promise<string> => {
  const userRespository = AppDataSource.getRepository(User);

  const user = await userRespository.findOneBy({
    email: email,
  });
  if (!user) {
    throw new AppError("Invalid email or password", 403);
  }

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    throw new AppError("Invalid email or password", 403);
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  );

  return token;
};

export default createSessionService;
