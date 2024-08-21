"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_constant_1 = require("../Auth/auth.constant");
const facility_controller_1 = require("./facility.controller");
const facilityValidation_1 = require("./facilityValidation");
const routes = express_1.default.Router();
routes.get('/', facility_controller_1.FacilityController.getAllFacility);
routes.post('/', (0, authGuard_1.default)(auth_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(facilityValidation_1.facilityValidations.createFacilityValidationSchema), facility_controller_1.FacilityController.createFacility);
routes.get('/:id', facility_controller_1.FacilityController.getSingleFacility);
routes.put('/:id', (0, authGuard_1.default)(auth_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(facilityValidation_1.facilityValidations.updateFacilityValidationSchema), facility_controller_1.FacilityController.updateFacility);
routes.delete('/:id', (0, authGuard_1.default)(auth_constant_1.USER_ROLE.admin), facility_controller_1.FacilityController.deleteFacility);
exports.FacilityRoutes = routes;
