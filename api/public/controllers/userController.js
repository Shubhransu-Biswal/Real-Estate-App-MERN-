import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import User from "../models/userModel.js";
import Listing from "../models/listingModel.js";

export const uesrController = (req, res, next) => {
  res.json({
    message: "Show up",
  });
};

// Update user
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

// Delete User
export const deleteUser = catchAsync(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(new AppError("You can only delete your account", 401));
  }

  await User.findByIdAndDelete(req.user.id);
  res.clearCookie("access_token");
  res.status(200).json("User deleted successfully");
});

// get listings
export const findListings = catchAsync(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(new AppError("You can only see your listings ", 401));
  }

  const listings = await Listing.find({ userRef: req.params.id });

  res.status(200).json({
    status: "success",
    body: {
      listings,
    },
  });
});
