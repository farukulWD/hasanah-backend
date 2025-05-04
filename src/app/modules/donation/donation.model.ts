import mongoose, { model, Schema } from "mongoose";
import { IDonation } from "./donation.interface";

const donationSchema = new Schema<IDonation>(
  {
    donorName: { type: String },
    donorEmailOrPhone: { type: String, required: true },
    amount: { type: Number, required: true },
    purpose: { type: String },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    transactionId: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Donation = model<IDonation>("Donation", donationSchema);
