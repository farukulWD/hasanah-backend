import { Schema } from "mongoose";

export interface IDonation extends Document {
  _id?: string;
  donorName?: string;
  donorEmailOrPhone: string;
  amount: number;
  purpose?: string;
  projectId: Schema.Types.ObjectId;
  transactionId?: string;
  status?: "pending" | "completed" | "failed";
  createdAt?: Date;
  updatedAt?: Date;
}
