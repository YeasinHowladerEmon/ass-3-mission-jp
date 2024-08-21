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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const auth_model_1 = require("./auth.model");
const auth_utils_1 = require("./auth.utils");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.create(payload);
    const userWithoutPassword = yield auth_model_1.User.findById(user._id).select("-password");
    return userWithoutPassword;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const findOne = yield auth_model_1.User.findOne({ email: payload.email }).select("+password");
    // const user = await User.find()
    console.log(findOne);
    if (!findOne) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User is not found");
    }
    if (!(yield auth_model_1.User.isPasswordMatched(payload.password, findOne.password))) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Password do not matched");
    }
    const jwtPayload = {
        userId: findOne === null || findOne === void 0 ? void 0 : findOne.id,
        role: findOne === null || findOne === void 0 ? void 0 : findOne.role
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const finalDataOfUser = yield auth_model_1.User.findById(findOne === null || findOne === void 0 ? void 0 : findOne._id).select("-password");
    return {
        token: accessToken,
        user: finalDataOfUser
    };
});
exports.AuthService = {
    createUser,
    loginUser
};
