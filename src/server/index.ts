import express from "express";
import morgan from "morgan";
import cors from "cors";
import robotsRouter from "./routers/robots/robotsRouter.js";
import { generalError, notFoundError } from "./middlewares/errorMiddlewares.js";
import userRouter from "./routers/users/userRouter.js";

const allowedOrigins = [
  "http://localhost:5173",
  "https://202304-w7ch1-luis-caballe-front.netlify.app",
  "https://202304-w7ch1-carlos-aliaga-front.netlify.app",
  "https://202304-w7ch1-ruben-ramirez.netlify.app",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(cors(options));

app.use(express.json());

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use("/user", userRouter);

app.use("/robots", robotsRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
