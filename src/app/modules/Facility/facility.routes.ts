import express from 'express';
import authGuard from '../../middlewares/authGuard';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../Auth/auth.constant';
import { FacilityController } from './facility.controller';
import { facilityValidations } from './facilityValidation';



const routes = express.Router();

routes.get('/', FacilityController.getAllFacility);

routes.post(
  '/',
  authGuard(USER_ROLE.admin),
  validateRequest(facilityValidations.createFacilityValidationSchema),
  FacilityController.createFacility
);

routes.get('/:id', FacilityController.getSingleFacility);

routes.put(
  '/:id',
  authGuard(USER_ROLE.admin),
  validateRequest(facilityValidations.updateFacilityValidationSchema),
  FacilityController.updateFacility
);

routes.delete('/:id', authGuard(USER_ROLE.admin), FacilityController.deleteFacility);

export const FacilityRoutes =  routes 