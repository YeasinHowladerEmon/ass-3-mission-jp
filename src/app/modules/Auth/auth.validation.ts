import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required." }),
    password: z.string({ required_error: "Password is required" })
  })
});

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }),
    password: z.string({ required_error: "Password is required" }),
    phone: z.string({ required_error: "Phone is required" }),
    role: z.string({ required_error: "Role is required" }),
    address: z.string({ required_error: "Address is required" })
  })
});

export const AuthValidation = {
  loginValidationSchema,
  createUserValidationSchema
};
