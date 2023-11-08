import Listing from "../models/listingModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const createListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.create(req.body);

  console.log(listing);

  res.status(201).json({
    status: "success",
    body: {
      listing,
    },
  });
});

// delete
export const deleteListing = catchAsync(async (req, res, next) => {
  // cheking if listing exists
  const list = await Listing.findById(req.params.id);
  if (!list) {
    return next(new AppError("Listing does no longer exists", 404));
  }

  // checking if user is the same as logined user
  if (req.user.id !== list.userRef) {
    return next(new AppError("You can only delete your listings", 401));
  }

  await Listing.findByIdAndDelete(req.params.id);

  res.status(200).json("List deleted Successfully");
});

// update
export const updateListing = catchAsync(async (req, res, next) => {
  // cheking if listing exists
  const list = await Listing.findById(req.params.id);
  if (!list) {
    return next(new AppError("Listing does no longer exists", 404));
  }

  // checking if user is the same as logined user
  if (req.user.id !== list.userRef) {
    return next(new AppError("You can only delete your listings", 401));
  }

  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    body: {
      updatedListing,
    },
  });
});

// read

export const getListing = catchAsync(async (req, res, next) => {
  // cheking if listing exists
  const list = await Listing.findById(req.params.id);
  if (!list) {
    return next(new AppError("Listing does no longer exists", 404));
  }

  res.status(200).json({
    status: "success",
    body: {
      listing: list,
    },
  });
});
