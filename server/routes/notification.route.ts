import { Router } from "express";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification.controller";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";

const notificationsRouter = Router();

notificationsRouter.get(
  "/get-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  getNotifications
);
notificationsRouter.put(
  "/update-notification/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotification
);
export default notificationsRouter;
