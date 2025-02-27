import { Router } from "express";
import {
  block,
  getUser,
  getUserByUUID,
  login,
  register,
  updateAvatar,
  updateInfo,
} from "../controllers/user";
import { auth } from "../middlewares";

const userRouter = Router();

userRouter
  .post("/user/register", register)
  .post("/user/login", login)
  .patch("/user/", auth, updateInfo)
  .patch("/user/avatar", auth, updateAvatar)
  .patch("/user/block", auth, block)
  .get("/user-by-uuid/:uuid", getUserByUUID)
  .get("/user/:token", getUser);

export default userRouter;
