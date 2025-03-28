import { createUser } from "../controller/users/create-user.js";

import express from "express";
import { deleteUser } from "../controller/users/delete-user.js";
import { login } from "../controller/users/login.js";
import { authorizationMiddleware } from "../middleware/autho.js";
import { getUsers } from "../controller/users/get-user.js";
import { updateUser } from "../controller/users/update-user.js";

export const userRouter = express.Router();

userRouter.get("/", authorizationMiddleware, getUsers);
userRouter.post("/", createUser);
userRouter.put("/", authorizationMiddleware, updateUser);
userRouter.delete("/", authorizationMiddleware, deleteUser);
userRouter.post("/login", login);