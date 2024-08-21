import express from 'express';
import authGuard from '../../middlewares/authGuard';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../Auth/auth.constant';
import { BookingController } from './booking.controller';
import { BookingValidations } from './bookingValidation';




const routes = express.Router();

routes.get('/',authGuard(USER_ROLE.admin) ,BookingController.getAllBooking);
routes.get('/check-availability', BookingController.getCheckAvailability);

routes.post(
  '/',
  authGuard(USER_ROLE.user),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingController.createBooking
);

routes.get('/user', authGuard(USER_ROLE.user), BookingController.getBookingByUser);

routes.delete('/:id', authGuard(USER_ROLE.user), BookingController.deleteBooking);

export const BookingRoutes =  routes 