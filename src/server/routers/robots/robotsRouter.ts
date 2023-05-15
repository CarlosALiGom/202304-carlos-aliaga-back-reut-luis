import { Router } from "express";
import { getRobots } from "../../controllers/robots/robotsControllers.js";
import auth from "../../middlewares/authMiddleware.js";

const robotsRouter = Router();

robotsRouter.get("/", auth, getRobots);

export default robotsRouter;
