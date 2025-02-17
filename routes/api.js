import express from "express";
const router = express.Router();

import * as TaskController from "../app/controllers/TaskController.js";
import * as UserController from "../app/controllers/UserController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";

// User routes
router.post("/Registration", UserController.Registration);
router.post("/Login", UserController.Login);
router.get("/ProfileDetails", AuthMiddleware, UserController.ProfileDetails);
router.post("/ProfileUpdate",AuthMiddleware, UserController.ProfileUpdate);

router.post("/EmailVerify/:email", UserController.EmailVerify);
router.post("/CodeVerify", UserController.CodeVerify);
router.post("/ResetPassword", UserController.ResetPassword);


// Task routes
router.post("/CreateTask",AuthMiddleware, TaskController.CreateTask);
router.get("/UpdateTaskStatus/:id/:status",AuthMiddleware,TaskController.UpdateTaskStatus);
router.get("/TaskListByStatus/:status",AuthMiddleware,TaskController.TaskListByStatus);
router.get("/DeleteTask/:id",AuthMiddleware,TaskController.DeleteTask);
router.get("/CountTask",AuthMiddleware,TaskController.CountTask);

export default router;
