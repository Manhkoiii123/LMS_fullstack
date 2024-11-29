import express from "express";

import { authorizeRoles, isAuthenticated } from "../middlewares/auth";
import {
  addAnswer,
  addQuestion,
  addReplyReview,
  addReview,
  deleteCourse,
  editCourse,
  getAllCourses,
  getAllCoursesAdmin,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
const courseRouter = express.Router();
courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);

courseRouter.get("/get-course/:id", getSingleCourse);
courseRouter.get("/get-courses", getAllCourses);
// vào trang khóa học để học (đã mua)
courseRouter.get("/get-course-content/:id", isAuthenticated, getCourseByUser);
// add question
courseRouter.put("/add-question", isAuthenticated, addQuestion);
courseRouter.put("/reply-question", isAuthenticated, addAnswer);
courseRouter.put("/add-review/:id", isAuthenticated, addReview);
courseRouter.put(
  "/reply-reviews",
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyReview
);
courseRouter.get(
  "/get-all-courses",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCoursesAdmin
);
courseRouter.delete(
  "/delete-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCourse
);

export default courseRouter;
