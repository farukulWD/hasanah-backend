import mongoose, { Schema } from "mongoose";
import { IVolunteerApplication } from "./volunteer.interface";

const volunteerApplicationSchema = new Schema<IVolunteerApplication>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
    },
    availability: {
      type: String,
      required: true,
    },
    motivation: {
      type: String,
    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        rel:"User"

    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Volunteer = mongoose.model<IVolunteerApplication>(
  "volunteer",
  volunteerApplicationSchema
);
