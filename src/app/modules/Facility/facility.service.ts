import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { IFacility } from "./facility.interface";
import { Facility } from "./facility.modal";

const createFacility = async (
  payload: IFacility
): Promise<void | IFacility> => {
  const result = await Facility.create(payload);
  return result;
};

const updateFacility = async (
  payload: Partial<IFacility>,
  id: string
): Promise<IFacility | null> => {
  const result = await Facility.findByIdAndUpdate(id, payload, {
    new: true
  });
  return result;
};

const softDeleteFacility = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

const getSingleFacility = async (id: string): Promise<null | IFacility> => {
  const result = await Facility.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Facility not Found");
  }
  return result;
};

const getAllFacility = async (): Promise<null | IFacility[]> => {
  const result = await Facility.find();
  return result;
};
export const FacilityService = {
  createFacility,
  updateFacility,
  softDeleteFacility,
  getAllFacility,
  getSingleFacility
};
