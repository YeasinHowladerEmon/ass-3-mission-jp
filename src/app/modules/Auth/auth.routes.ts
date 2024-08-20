import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

router.post(
  "/signup",
  validateRequest(AuthValidation.createUserValidationSchema),
  AuthControllers.createUser
);

export const AuthRoutes = router;
