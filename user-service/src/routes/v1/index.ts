import { Router } from "express";
import infoRoutes from "./info";
import userRoutes from "./userRoutes";

const v1Routes = Router();

v1Routes.use("/info", infoRoutes)
v1Routes.use("/user", userRoutes)

export default v1Routes;


//this is how to structure the routes
//this is how to structure the routes
//this is how to structure the routes
//this is how to structure the routes
//this is how to structure the routes