import User from "../models/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { access } from "fs";
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

// login
export const signin = catchAsync(async (req, res, next) => {
  // check for email and password
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please give your email and password", 400));
  }

  // check for valid user and password
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Please Enter Correct Email and Password", 401));
  }

  //send token
  const token = await promisify(jwt.sign)(
    { id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  res.cookie("access_token", token, { httpOnly: true }).status(200).json({
    status: "success",
    body: {
      user,
    },
  });
  res.send("done");
});

// google
export const google = catchAsync(async (req, res, next) => {
  const { userName, email, image } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const token = await promisify(jwt.sign)(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        status: "success",
        body: {
          newUser: user,
        },
      });
  } else {
    const newPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const newUserObj = {
      userName:
        userName.split(" ")[0].toLowerCase() +
        "-" +
        Math.random().toString(36).slice(-4),
      email,
      password: newPassword,
      image,
    };
    const newUser = await User.create(newUserObj);

    const token = await promisify(jwt.sign)(
      { id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      status: "success",
      body: {
        newUser,
      },
    });
  }
});

// protect routes
export const protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(
      new AppError("You are not logged in! please login to continue", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("User does no longer exist", 401));
  }

  req.user = currentUser;

  next();
});
