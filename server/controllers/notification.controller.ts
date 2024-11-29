import { Request, Response, NextFunction } from "express";
import { notificationModel, INotification } from "../models/notification.model";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middlewares/catchAsyncError";
export const getNotifications = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await notificationModel
        .find()
        .sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

// update
export const updateNotification = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notificationId = req.params.id;
      const notification = await notificationModel.findById(notificationId);
      if (notification) {
        notification.status = "read";
      } else {
        next(new ErrorHandler("Notification not found", 404));
      }
      await notification?.save();
      const notifications = await notificationModel
        .find()
        .sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);
