import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./public/routers/userRouter.js";
const app = express();

// adding config file
dotenv.config({ path: "./config.env" });

// connecting database
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err.message));

// all routes
app.use("/api/v1/users", userRouter);

// listening at 3000
const port = 3000;
app.listen(port, () => console.log(`Server is running at port: ${port}...`));
