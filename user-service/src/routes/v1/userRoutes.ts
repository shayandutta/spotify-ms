import {Router} from "express";
import { userController } from "../../controllers";
import { userMiddleware } from "../../middlewares";

const userRouter = Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userMiddleware.requestValidator, userController.login);
userRouter.get("/me", userMiddleware.isAuthenticated, userController.myProfile);

export default userRouter;