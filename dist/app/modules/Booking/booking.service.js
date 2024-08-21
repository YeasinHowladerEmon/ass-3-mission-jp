"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const facility_modal_1 = require("../Facility/facility.modal");
const booking_modal_1 = require("./booking.modal");
const booking_utils_1 = require("./booking.utils");
const facilityOpenTime = "06:00 AM";
const facilityCloseTime = "10:00 PM";
//
const createBooking = (payload, users) => __awaiter(void 0, void 0, void 0, function* () {
    const { facility, date, endTime, startTime } = payload;
    const isFacility = yield facility_modal_1.Facility.findById(facility);
    if (!isFacility) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "facility not found");
    }
    const st24 = (0, booking_utils_1.format24Hour)(startTime);
    const et24 = (0, booking_utils_1.format24Hour)(endTime);
    const pricePerHour = isFacility.pricePerHour;
    //slot available
    const existingBookings = yield booking_modal_1.Booking.find({
        date,
        $or: [{ startTime: { $lt: et24 }, endTime: { $gt: st24 } }]
    });
    if (existingBookings.length > 0) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Facility is not available during the requested time slot");
    }
    //calculate
    const payableAmount = (0, booking_utils_1.calculateDurationAndPayableAount)(startTime, endTime, pricePerHour);
    // console.log(payableAmount);
    const dateOfBooking = {
        facility: facility,
        date: date,
        startTime: st24,
        endTime: et24,
        user: users.userId,
        payableAmount: payableAmount,
        isBooked: "confirmed"
    };
    const result = yield booking_modal_1.Booking.create(dateOfBooking);
    return result;
});
const updateBooking = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_modal_1.Booking.findByIdAndUpdate(id, payload, {
        new: true
    });
    return result;
});
const DeleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_modal_1.Booking.findByIdAndDelete(id, { isBooked: "canceled" });
    return result;
});
const getBookingByUser = (users) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_modal_1.Booking.find({ user: users.userId }).populate("facility");
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Booking not Found");
    }
    return result;
});
const getAllBooking = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_modal_1.Booking.find().populate("facility").populate("user");
    return result;
});
// :
const getCheckAvailability = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { date = new Date().toISOString().split("T")[0] } = req.query;
    console.log(date);
    const selectedDate = new Date(date);
    const bookings = yield booking_modal_1.Booking.find({ date: selectedDate }).sort("startTime");
    let availableSlots = [];
    if (bookings.length === 0) {
        availableSlots.push({
            startTime: facilityOpenTime,
            endTime: facilityCloseTime
        });
    }
    else {
        console.log(facilityOpenTime);
        let currentStartTime = (0, booking_utils_1.format24Hour)(facilityOpenTime);
        console.log(currentStartTime);
        bookings.forEach(booking => {
            const bookingStartTime = (0, booking_utils_1.format24Hour)(booking.startTime);
            const bookingEndTime = (0, booking_utils_1.format24Hour)(booking.endTime);
            if (currentStartTime < bookingStartTime) {
                availableSlots.push({
                    startTime: (0, booking_utils_1.convertTimeTo12HourFormat)(currentStartTime),
                    endTime: (0, booking_utils_1.convertTimeTo12HourFormat)(bookingStartTime)
                });
            }
            currentStartTime = bookingEndTime;
            console.log(currentStartTime);
            console.log(bookingEndTime);
        });
        const facilityEndTime = (0, booking_utils_1.format24Hour)(facilityCloseTime);
        if (currentStartTime < facilityEndTime) {
            availableSlots.push({
                startTime: (0, booking_utils_1.convertTimeTo12HourFormat)(currentStartTime),
                endTime: (0, booking_utils_1.convertTimeTo12HourFormat)(facilityEndTime)
            });
        }
    }
    if (availableSlots.length === 0) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Facility is not available during the requested date time slot");
    }
    return availableSlots;
});
exports.BookingService = {
    createBooking,
    updateBooking,
    DeleteBooking,
    getAllBooking,
    getCheckAvailability,
    getBookingByUser
};
