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
exports.FacilityService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const facility_modal_1 = require("./facility.modal");
const createFacility = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_modal_1.Facility.create(payload);
    return result;
});
const updateFacility = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_modal_1.Facility.findByIdAndUpdate(id, payload, {
        new: true
    });
    return result;
});
const softDeleteFacility = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_modal_1.Facility.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const getSingleFacility = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_modal_1.Facility.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Facility not Found");
    }
    return result;
});
const getAllFacility = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_modal_1.Facility.find();
    return result;
});
exports.FacilityService = {
    createFacility,
    updateFacility,
    softDeleteFacility,
    getAllFacility,
    getSingleFacility
};
