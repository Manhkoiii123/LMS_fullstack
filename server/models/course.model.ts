import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user.model";
interface IComment extends Document {
  user: IUser;
  question: string;
  questionReplies: Array<IComment>;
}
interface IReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
  commentReplies: Array<IComment>;
}
interface ILink extends Document {
  title: string;
  url: string;
}
interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: Array<ILink>;
  suggestion: string;
  questions: Array<IComment>;
}
interface ICourse extends Document {
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: Array<{ title: string }>;
  preRequisites: Array<{ title: string }>;
  reviews: Array<IReview>;
  courseData: Array<ICourseData>;
  ratings?: number;
  purchased?: number;
}
const reviewSchema = new Schema<IReview>({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
  commentReplies: [Object],
});
const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

const commentSchema = new Schema<IComment>({
  user: Object,
  question: String,
  questionReplies: [Object],
});

const courseDataSchema = new Schema<ICourseData>({
  title: String,
  description: String,
  videoUrl: String,
  videoSection: String,
  videoLength: Number,
  videoPlayer: String,
  links: [linkSchema],
  suggestion: String,
  questions: [commentSchema],
});

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    estimatedPrice: {
      type: Number,
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    tags: {
      type: String,
      required: true,
    },
    demoUrl: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    benefits: [{ title: String }],
    preRequisites: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const courseModel: Model<ICourse> = mongoose.model(
  "Course",
  courseSchema
);
