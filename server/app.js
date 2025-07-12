import express from "express";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({
  path: "./config/config.env",
});

export const app= express();

const allowedOrigins=[
  process.env.FRONTEND_URI1,
  process.env.FRONTEND_URI2,
  process.env.FRONTEND_URI3
]

//Using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:allowedOrigins,
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}));

//Using routes
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Nice Working");
});