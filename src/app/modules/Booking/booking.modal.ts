import { model, Schema, Types } from "mongoose";
import { BookingModel, IBooking } from "./booking.interface";

const BookingSchema = new Schema<IBooking, BookingModel>(
  {
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
      type: Types.ObjectId,
      ref: "User",
      required: true
    },
    facility: {
      type: Types.ObjectId,
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
  },
  {
    timestamps: true
  }
);

export const Booking = model<IBooking, BookingModel>("Booking", BookingSchema);
