import express from "express";

import {
  activateUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  updateAccessToken,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";
const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", isAuthenticated, logoutUser);
userRouter.get("/refresh-token", isAuthenticated, updateAccessToken);
userRouter.get("/me", isAuthenticated, getUserInfo);
export default userRouter;
