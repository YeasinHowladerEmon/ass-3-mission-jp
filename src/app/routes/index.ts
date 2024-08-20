import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { BookingRoutes } from '../modules/Booking/booking.routes';
import { FacilityRoutes } from '../modules/Facility/facility.routes';



const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/facility',
    route: FacilityRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;