export interface IDonation extends Document {
  _id?: string;
  donorName?: string;
  donorEmailOrPhone?: string;
  amount: number;
  purpose?: string;
  projectId?: string;
  paymentId?: string;
  status?: "pending" | "completed" | "failed";
  createdAt?: Date;
  updatedAt?: Date;
}
