import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";


const getAllBooking = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await BookingService.getAllBooking();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking all fetched was successfully",
      data: result
    });
  }
);
const getCheckAvailability = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
  
   
    const result = await BookingService.
    getCheckAvailability(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Availability checked successfully",
      data: result
    });
  }
);

const getBookingByUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const user = req.user;
    const result = await BookingService.getBookingByUser(user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single fetched was Booking successfully",
      data: result
    });
  }
);

const createBooking = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const user = req.user;
    const result = await BookingService.createBooking(req.body, user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking was created successfully",
      data: result
    });
  }
);

const updateBooking = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const payload = req.body;
    const result = await BookingService.updateBooking(payload, id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking was edited successfully",
      data: result
    });
  }
);

const deleteBooking = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    const result = await BookingService.DeleteBooking(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking was deleted successfully",
      data: result
    });
  }
);

export const BookingController = {
  createBooking,
  updateBooking,
  deleteBooking,
  getAllBooking,
  getCheckAvailability,
  getBookingByUser
};