"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true
    },
    facility: {
        type: mongoose_1.Types.ObjectId,
        ref: "Facility",
        required: true
    },
    payableAmount: {
        type: Number,
        required: true
    },
    isBooked: {
        type: String,
        enum: ["confirmed", "unConfirmed", "canceled"]
    }
}, {
    timestamps: true
});
exports.Booking = (0, mongoose_1.model)("Booking", BookingSchema);
