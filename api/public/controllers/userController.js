import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import User from "../models/userModel.js";

export const uesrController = (req, res, next) => {
  res.json({
    message: "Show up",
  });
};

export const updateUser = catchAsync(async (req, res, next) => {
  console.log(req.body);

  if (req.params.id !== req.user.id) {
    return next(new AppError("You can only change your details", 401));
  }

  const currentUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        image: req.body.image,
      },
    },
    { new: true }
  );

  const { password, ...rest } = currentUser._doc;
  res.status(200).json({
    status: "success",
    body: {
      newUser: rest,
    },
  });
});
