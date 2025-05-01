import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";

const app: Application = express();


// Middleware

// CORS
const allowedOrigins = [
  "http://localhost:3000",
    "http://localhost:3001",
]

// app.use(
//     cors({
//       origin: (origin, callback) => {
        
//         if (!origin || allowedOrigins.includes(origin)) {
//           callback(null, true);
//         } else {
//           callback(new AppError(httpStatus.BAD_GATEWAY, 'Not allowed by CORS'));
//         }
//       },
//       credentials: true,
//     })
//   );


app.use(cors());

app.use(cookieParser());
app.use(express.json());



export default app;


