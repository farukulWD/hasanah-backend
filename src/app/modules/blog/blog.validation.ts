import { z } from "zod";

const blogValidationSchema = z.object({
  body: z.object({
    blogData: z.object({
      title: z.string({ message: "Blog title is required" }).min(3),
      content: z.string({ message: "Blog description is required" }).min(3),
      tags: z.array(z.string({ message: "tags are required" })),
    }),
  }),
});

export { blogValidationSchema };
