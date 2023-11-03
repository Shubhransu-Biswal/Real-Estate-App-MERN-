import User from "../models/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";

export const signup = catchAsync(async (req, res, next) => {
    const { userName, password, email } = req.body;
    const user = await User.create({ userName, email, password });

    res.status(200).json({
      status: "success",
      body: {
        user,
      },
    });

});
