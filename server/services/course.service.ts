import { Request, Response, NextFunction } from "express";
import { courseModel } from "../models/course.model";
import { catchAsyncError } from "../middlewares/catchAsyncError";

export const createCourse = catchAsyncError(
  async (data: any, res: Response) => {
    const course = await courseModel.create(data);
    res.status(201).json({
      success: true,
      course,
    });
  }
);
export const getAllCorsesService = async (res: Response) => {
  const courses = await courseModel.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, courses });
};
