import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    mobile: z.string().optional(),
    role: z.enum(["admin", "user", "superAdmin"]).optional(),
  }),
});

export { userValidationSchema };
