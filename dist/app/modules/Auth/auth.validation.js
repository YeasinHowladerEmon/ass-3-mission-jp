"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required." }),
        password: zod_1.z.string({ required_error: "Password is required" })
    })
});
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }),
        email: zod_1.z.string({ required_error: "Email is required" }),
        password: zod_1.z.string({ required_error: "Password is required" }),
        phone: zod_1.z.string({ required_error: "Phone is required" }),
        role: zod_1.z.string({ required_error: "Role is required" }),
        address: zod_1.z.string({ required_error: "Address is required" })
    })
});
exports.AuthValidation = {
    loginValidationSchema,
    createUserValidationSchema
};
