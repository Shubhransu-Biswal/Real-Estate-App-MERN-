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
