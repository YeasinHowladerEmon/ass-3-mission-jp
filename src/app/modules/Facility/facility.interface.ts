import { Model } from "mongoose";

export type IFacility = {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  isDeleted: boolean;
};

export type FacilityModel = Model<IFacility, Record<string, unknown>>;
