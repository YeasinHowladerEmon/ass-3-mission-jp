import { Model, ObjectId } from "mongoose";

export type IBooking = {
    date: Date;
    startTime: string;
    endTime: string;
    user: ObjectId;
    facility: ObjectId;
    payableAmount: number;
    isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
  };
  
  export type BookingModel = Model<IBooking, Record<string, unknown>>;