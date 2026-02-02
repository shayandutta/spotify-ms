import { Router } from "express";
import { infoController } from "../../controllers";

const infoRouter = Router();

infoRouter.get("/", infoController);

export default infoRouter;
