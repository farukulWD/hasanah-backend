import mongoose, { model, Schema } from "mongoose";

const donationSchema = new Schema(
  {
    donorName: { type: String },
    donorEmail: { type: String },
    amount: { type: Number, required: true },
    purpose: { type: String },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    paymentId: { type: String },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = model("Donation", donationSchema);
