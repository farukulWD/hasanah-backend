import status from "http-status";
import { z } from "zod";

const projectValidation = z.object({
  body: z.object({
    projectData: z.object({
      title: z
        .string({ message: "Title is required" })
        .min(3, { message: "Title must be at least 3 characters long" }),
      description: z.string({ message: "Description is required" }).min(10, {
        message: "Description must be at least 10 characters long",
      }),
      category: z
        .string({ message: "Category is required" })
        .min(3, { message: "Category must be at least 3 characters long" }),
      status: z
        .enum(["active", "completed", "upcoming"], {
          required_error: "Status is required",
        })
        .default("upcoming"),
      startDate: z.string({ message: "Start date is required" }).optional(),
      endDate: z.string({ message: "End date is required" }).optional(),
    }),
  }),
});

export { projectValidation };
