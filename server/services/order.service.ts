import mongoose, { Schema, model, Document } from "mongoose";
import { NextFunction } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import { orderModel } from "../models/order.model";
export const newOrder = catchAsyncError(
  async (data: any, res: Response, next: NextFunction) => {
    const order = await orderModel.create(data);
    next(order);
  }
);
