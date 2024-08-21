import httpStatus from "http-status";

import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../errors/ApiError";
import { Facility } from "../Facility/facility.modal";
import { IBooking } from "./booking.interface";
import { Booking } from "./booking.modal";
import {
  calculateDurationAndPayableAount,
  convertTimeTo12HourFormat,
  format24Hour
} from "./booking.utils";
type timeSlot = {
  startTime: string;
  endTime: string;
};

const facilityOpenTime = "06:00 AM";
const facilityCloseTime = "10:00 PM";
//
const createBooking = async (
  payload: IBooking,
  users: JwtPayload
): Promise<void | IBooking> => {
  const { facility, date, endTime, startTime } = payload;

  const isFacility = await Facility.findById(facility);

  if (!isFacility) {
    throw new ApiError(httpStatus.NOT_FOUND, "facility not found");
  }
  const st24 = format24Hour(startTime);
  const et24 = format24Hour(endTime);

  const pricePerHour = isFacility.pricePerHour;

  //slot available

  const existingBookings = await Booking.find({
    date,
    $or: [{ startTime: { $lt: et24 }, endTime: { $gt: st24 } }]
  });

  if (existingBookings.length > 0) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Facility is not available during the requested time slot"
    );
  }

  //calculate

  const payableAmount = calculateDurationAndPayableAount(
    startTime,
    endTime,
    pricePerHour
  );

  // console.log(payableAmount);

  const dateOfBooking = {
    facility: facility,
    date: date,
    startTime: st24,
    endTime: et24,
    user: users.userId,
    payableAmount: payableAmount,
    isBooked: "confirmed"
  } as IBooking;
  const result = await Booking.create(dateOfBooking);

  return result;
};

const updateBooking = async (
  payload: Partial<IBooking>,
  id: string
): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndUpdate(id, payload, {
    new: true
  });
  return result;
};

const DeleteBooking = async (id: string) => {
  const result = await Booking.findByIdAndDelete(id, { isBooked: "canceled" });
  return result;
};

const getBookingByUser = async (
  users: JwtPayload
): Promise<null | IBooking[]> => {
  const result = await Booking.find({ user: users.userId }).populate(
    "facility"
  );
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Booking not Found");
  }
  return result;
};

const getAllBooking = async (): Promise<null | IBooking[]> => {
  const result = await Booking.find().populate("facility").populate("user");
  return result;
};
// :
const getCheckAvailability = async (
  req: Request
): Promise<timeSlot[] | null> => {
  const { date = new Date().toISOString().split("T")[0] } = req.query;

  console.log(date);

  const selectedDate = new Date(date as string);

  const bookings: IBooking[] = await Booking.find({ date: selectedDate }).sort(
    "startTime"
  );
  let availableSlots: timeSlot[] = [];

  if (bookings.length === 0) {
    availableSlots.push({
      startTime: facilityOpenTime,
      endTime: facilityCloseTime
    });
  } else {
    console.log(facilityOpenTime);
    let currentStartTime = format24Hour(facilityOpenTime);
    console.log(currentStartTime);

    bookings.forEach(booking => {
      const bookingStartTime = format24Hour(booking.startTime);
      const bookingEndTime = format24Hour(booking.endTime);

      if (currentStartTime < bookingStartTime) {
        availableSlots.push({
          startTime: convertTimeTo12HourFormat(currentStartTime),
          endTime: convertTimeTo12HourFormat(bookingStartTime)
        });
      }
      currentStartTime = bookingEndTime;
      console.log(currentStartTime);
      console.log(bookingEndTime);
    });

    const facilityEndTime = format24Hour(facilityCloseTime);
    if (currentStartTime < facilityEndTime) {
      availableSlots.push({
        startTime: convertTimeTo12HourFormat(currentStartTime),
        endTime: convertTimeTo12HourFormat(facilityEndTime)
      });
    }
  }

  if (availableSlots.length === 0) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Facility is not available during the requested date time slot"
    );
  }

  return availableSlots;
};
export const BookingService = {
  createBooking,
  updateBooking,
  DeleteBooking,
  getAllBooking,
  getCheckAvailability,
  getBookingByUser
};
