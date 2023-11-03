import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./public/routers/userRouter.js";
import authRouter from "./public/routers/authRouter.js";
import AppError from "./public/utils/appError.js";
const app = express();

// allowing sending json to server
app.use(express.json());

// adding config file
dotenv.config({ path: "./config.env" });

// connecting database
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err.message));

// all routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

// Handling unwanted route error
app.all('*',(req,res,next)=>{
    return next(new AppError('No such route present on this server',404))
})

// Global error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || "error";
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status,
    statusCode,
    message,
  });
});

// listening at 3000
const port = 3000;
app.listen(port, () => console.log(`Server is running at port: ${port}...`));
