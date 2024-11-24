import { Response } from "express";
import userModel, { IUser } from "../models/user.model";

export const getUserById = async (id: string, res: Response) => {
  const user = await userModel.findById(id);
  res.status(200).json({ success: true, user });
};
