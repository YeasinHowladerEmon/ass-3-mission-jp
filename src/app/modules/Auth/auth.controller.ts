import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req:Request, res:Response) => {
  console.log(req)
    const result = await AuthService.loginUser(req.body);
    console.log(result)
    const { token, user} = result;
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message:  "User logged in successfully",
      token: token,
      data: user,
    });
  });
const createUser = catchAsync(async (req:Request, res:Response) => {
    const result = await AuthService.createUser(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User registered successfully",
      data: result,
    });
  });

  export const AuthControllers = {
    loginUser,
    createUser,
  };