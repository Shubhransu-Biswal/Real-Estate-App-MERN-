import User from "../models/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
export const signup = catchAsync(async (req, res, next) => {
  const { userName, password, email } = req.body;
  if (!userName || !password || !email) {
    next(new AppError("Please provide username , email and password"));
  }
  const user = await User.create({ userName, email, password });

  res.status(200).json({
    status: "success", 
    body: {
      user,
    },
  });
});
