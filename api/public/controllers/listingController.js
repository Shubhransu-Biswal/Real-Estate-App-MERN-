import Listing from "../models/listingModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const createListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.create(req.body);

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

// read all
export const getListings = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 9;

  const startIndex = parseInt(req.query.startIndex) || 0;

  let offer = req.query.offer;
  if (offer === undefined || offer === "false") {
    offer = { $in: [false, true] };
  }

  let furnished = req.query.furnished;
  if (furnished === undefined || furnished === "false") {
    furnished = { $in: [false, true] };
  }

  let parking = req.query.parking;
  if (parking === undefined || parking === "false") {
    parking = { $in: [true, false] };
  }

  let type = req.query.type;
  if (type === undefined || type === "all") {
    type = { $in: ["sale", "rent"] };
  }

  const searchTerm = req.query.searchTerm || "";

  const sort = req.query.sort || "createdAt";

  const order = req.query.order || "desc";

  const listings = await Listing.find({
    // regex will match ther word and option will deactive the case sensitiveness
    name: { $regex: searchTerm, $options: "i" },
    offer,
    furnished,
    parking,
    type,
  })
    .sort({ [sort]: order })
    .limit(limit)
    .skip(startIndex);

  return res.status(200).json({
    status: "success",
    body: {
      listings,
    },
  });
});
