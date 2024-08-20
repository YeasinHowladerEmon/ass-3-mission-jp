import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../../config";
import { IUser, UserModel } from "./auth.interface";

const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: 0
    },
    phone: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "user"]
    },
    address: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

UserSchema.statics.isPasswordMatched = async function (
  normalPassword,
  hashedPassword
) {
  return await bcrypt.compare(normalPassword, hashedPassword);
};

export const User = model<IUser, UserModel>("User", UserSchema);
