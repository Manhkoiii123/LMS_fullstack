import dotenv from "dotenv";
import { IUser } from "../models/user.model";
import { Response } from "express";
import { redis } from "./redis";
dotenv.config();
interface ITokenOptions {
  expiresIn: string;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}
export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();
  //upload to redis
  redis.set(user._id, JSON.stringify(user) as any);
  // parse env variables to integrate with fallback values
  const accessTokenExpire = parseInt(
    process.env.ACCESS_TOKEN_EXPIRE || "300",
    10
  );
  const refreshTokenExpire = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE || "1200",
    10
  );
  const accessTokenOptions: ITokenOptions = {
    expiresIn: new Date(
      Date.now() + accessTokenExpire * 60 * 1000
    ).toUTCString(),
    maxAge: accessTokenExpire * 1000,
    httpOnly: true,
    sameSite: "lax",
  };
  const refreshTokenOptions: ITokenOptions = {
    expiresIn: new Date(
      Date.now() + refreshTokenExpire * 60 * 1000
    ).toUTCString(),
    maxAge: refreshTokenExpire * 1000,
    httpOnly: true,
    sameSite: "lax",
  };
  // only set secure to true in production
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  res.cookie("accessToken", accessToken, accessTokenOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenOptions);
  res.status(statusCode).json({ success: true, user, accessToken });
};
