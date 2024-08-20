import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import ApiError from "../errors/ApiError";
import { IUserRole } from "../modules/Auth/auth.interface";
import catchAsync from "../utils/catchAsync";

const authGuard = (...requiredRoles: IUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    console.log(token)

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    if(token.startsWith('Bearer ')){
     token = token.split(' ')[1]
    }

    const decoded = jwt.verify(token, config.jwt_access_secret as string);

    const { role, user } = decoded as JwtPayload;

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "You are  not authorized Bro!"
      );
    }
    req.user = decoded as JwtPayload;

    next();
  });
};

export default authGuard;
