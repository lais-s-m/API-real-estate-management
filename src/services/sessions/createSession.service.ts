import { compare } from "bcrypt";
import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { ISessionRequest } from "../../interfaces/session.interfaces";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createSessionService = async ({
  email,
  password,
}: ISessionRequest): Promise<string> => {
  const userRespository = AppDataSource.getRepository(User);

  const user = await userRespository.findOneBy({
    email: email,
  });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid email or password");
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
