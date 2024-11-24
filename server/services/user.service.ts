import { Response } from "express";
import userModel from "../models/user.model";
import { redis } from "../utils/redis";

export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);
  const user = userJson ? JSON.parse(userJson) : await userModel.findById(id);
  res.status(200).json({ success: true, user });
};
