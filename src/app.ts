import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";
import router from "./app/routes/routes";
import AppError from "./app/errors/AppError";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import config from "./app/config";

const app: Application = express();

// Middleware

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  `http://localhost:${config.PORT}`,
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log({ origin });
      if (  !origin || allowedOrigins.includes(origin)||origin === "null") {
        callback(null, true);
      } else {
        callback(new AppError(httpStatus.BAD_GATEWAY, "Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", router);
app.use(globalErrorHandler);

app.use(notFound);

export default app;
