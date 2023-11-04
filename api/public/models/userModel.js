import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      select: false,
    },
  },
  { timestamps: true }
);

// encryptin password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const encryptedPassword = await bcrypt.hash(this.password, 12);
  this.password = encryptedPassword;
  next();
});

// Instance method to check password
userSchema.methods.checkPassword = async (
  userEnterdPassword,
  dbStoredPassword
) => {
  return await bcrypt.compare(userEnterdPassword, dbStoredPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
