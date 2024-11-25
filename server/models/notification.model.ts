import mongoose, { Schema, model, Document } from "mongoose";
export interface INotification extends Document {
  title: string;
  message: string;
  status: string;
  userId: string;
}
const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "unread",
    },
  },
  { timestamps: true }
);
export const notificationModel = model<INotification>(
  "Notification",
  notificationSchema
);
