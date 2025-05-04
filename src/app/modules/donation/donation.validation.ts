import { z } from "zod";

const donationValidationSchema = z.object({
  body: z.object({
    donorName: z.string({ message: "Donor name is required" }).optional(),
    donorEmailOrPhone: z
      .string({ message: "Donor email is required" })
      .email("Invalid email format")
      .optional(),
    amount: z
      .number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
      })
      .positive("Amount must be greater than 0"),
    purpose: z.string().optional(),
    projectId: z.string().optional(),
    paymentId: z.string().optional(),
  }),
});

export { donationValidationSchema };
