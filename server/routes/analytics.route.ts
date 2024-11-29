import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";
import {
  getCoursesAnalytics,
  getOrdersAnalytics,
  getUsersAnalytics,
} from "../controllers/analytics.controller";
const analyticsRouter = express.Router();

analyticsRouter.get(
  "/get-users-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getUsersAnalytics
);
analyticsRouter.get(
  "/get-order-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getOrdersAnalytics
);
analyticsRouter.get(
  "/get-course-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getCoursesAnalytics
);

export default analyticsRouter;
