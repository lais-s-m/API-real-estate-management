import { Request, Response } from "express";
import User from "../entities/user.entity";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";

//Create
export const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const createdUser = await createUserService(user);
  return res.status(201).json(createdUser);
};

//Read
export const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();
  return res.json(users);
};

//Update
export const updateUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const user: IUserUpdate = req.body;
  const userId = req.user.id;
  const isAdm = req.user.isAdm;

  const updatedUser = await updateUserService(user, id, userId, isAdm);
  if (updatedUser instanceof User) {
    return res.json({
      message: "User updated with success",
      updatedUser: updatedUser,
    });
  }
  return res.json(updatedUser);
};

//Delete
export const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteUserService(id);
  return res.status(204).send();
};
