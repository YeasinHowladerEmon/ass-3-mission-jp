"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_constant_1 = require("../Auth/auth.constant");
const booking_controller_1 = require("./booking.controller");
const bookingValidation_1 = require("./bookingValidation");
const routes = express_1.default.Router();
routes.get('/', (0, authGuard_1.default)(auth_constant_1.USER_ROLE.admin), booking_controller_1.BookingController.getAllBooking);
routes.get('/check-availability', booking_controller_1.BookingController.getCheckAvailability);
routes.post('/', (0, authGuard_1.default)(auth_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(bookingValidation_1.BookingValidations.createBookingValidationSchema), booking_controller_1.BookingController.createBooking);
routes.get('/user', (0, authGuard_1.default)(auth_constant_1.USER_ROLE.user), booking_controller_1.BookingController.getBookingByUser);
routes.delete('/:id', (0, authGuard_1.default)(auth_constant_1.USER_ROLE.user), booking_controller_1.BookingController.deleteBooking);
exports.BookingRoutes = routes;
