"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = void 0;
const zod_1 = require("zod");
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        facility: zod_1.z.string(),
        date: zod_1.z.string(),
        startTime: zod_1.z.string(),
        endTime: zod_1.z.string()
    })
});
exports.BookingValidations = {
    createBookingValidationSchema,
};
