import httpStatus from "http-status";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { IUser } from "./auth.interface";
import { User } from "./auth.model";
import { createToken } from "./auth.utils";
 


const createUser = async (payload: IUser) => {
  const user = await User.create(payload);
  const userWithoutPassword = await User.findById(user._id).select("-password");

  return userWithoutPassword;
};
const loginUser = async (payload: { email: string; password: string }) => {
  console.log(payload);
  const findOne = await User.findOne({ email: payload.email }).select("+password");
  // const user = await User.find()
  console.log(findOne);
  if (!findOne) {
    throw new ApiError(httpStatus.NOT_FOUND, "User is not found");
  }

  if (!(await User.isPasswordMatched(payload.password, findOne.password))) {
    throw new ApiError(httpStatus.FORBIDDEN, "Password do not matched");
  }

  const jwtPayload = {
    userId: findOne?.id,
    role: findOne?.role
  } 



  const accessToken = createToken(jwtPayload , config.jwt_access_secret as string, config.jwt_access_expires_in as string)

  const finalDataOfUser = await User.findById(findOne?._id).select("-password");

  return {
    token: accessToken,
    user: finalDataOfUser
  };
};

export const AuthService = {
  createUser,
  loginUser
};
