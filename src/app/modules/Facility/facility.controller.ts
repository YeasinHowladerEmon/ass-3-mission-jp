import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacilityService } from "./facility.service";

const getAllFacility = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await FacilityService.getAllFacility();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Facility all fetched was successfully",
      data: result
    });
  }
);

const getSingleFacility = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await FacilityService.getSingleFacility(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single fetched was Facility successfully",
      data: result
    });
  }
);

const createFacility = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await FacilityService.createFacility(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Facility was created successfully",
      data: result
    });
  }
);

const updateFacility = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const payload = req.body;
    const result = await FacilityService.updateFacility(payload, id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Facility was edited successfully",
      data: result
    });
  }
);

const deleteFacility = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    const result = await FacilityService.softDeleteFacility(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Facility was deleted successfully",
      data: result
    });
  }
);

export const FacilityController = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacility,
  getSingleFacility
};
