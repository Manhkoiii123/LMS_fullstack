import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { orderModel, IOrder } from "../models/order.model";
import { courseModel } from "../models/course.model";
import path from "path";
import ejs from "ejs";
import sendEmail from "../utils/sendMail";
import { notificationModel } from "../models/notification.model";
import userModel from "../models/user.model";
import { getAllOrderService, newOrder } from "../services/order.service";

export const createOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;
      const user = await userModel.findById(req.user?._id);
      const courseExists = user?.courses?.some(
        (course: any) => course.courseId.toString() === courseId
      );
      if (courseExists) {
        return next(
          new ErrorHandler("You have already purchased this course", 400)
        );
      }
      const course = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }
      const data: any = {
        courseId: course?._id,
        userId: req.user?._id,
        payment_info,
      };
      await orderModel.create(data);
      //   newOrder(data, res, next);
      const mailData = {
        order: {
          _id: course?._id,
          name: course?.name,
          price: course?.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );
      try {
        if (user) {
          await sendEmail({
            email: user?.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
      user?.courses?.push({
        courseId: course?._id as string,
      });
      await user?.save();
      await notificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You have successfully purchased ${course?.name}`,
      });
      if (course.purchased) {
        course.purchased += 1;
      }
      await course?.save();
      return res.status(200).json({
        success: true,
        message: "Order created successfully",
        order: data,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getAllOrders = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrderService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
