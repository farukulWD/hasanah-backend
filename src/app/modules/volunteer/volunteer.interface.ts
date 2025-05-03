export interface IVolunteerApplication extends Document {
  _id?: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  skills?: string[];
  availability?: string;
  motivation?: string;
  status?: "pending" | "accepted" | "rejected";
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
