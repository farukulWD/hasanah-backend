import { z } from "zod";

const volunteerApplicationValidationSchema = z.object({
  body: z.object({
    fullName: z.string({
      message: "Full name is required",
    }),
    email: z
      .string({
        message: "Email is required",
      })
      .email("Invalid email format"),
    phone: z.string({
      message: "Phone number is required",
    }),
    address: z.string({ message: "Address is required" }),
    skills: z.array(z.string()).optional(),
    availability: z.string().optional(),
    motivation: z.string().optional(),
  }),
});

export { volunteerApplicationValidationSchema };
