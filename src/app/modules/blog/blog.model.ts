import mongoose, { model, Schema } from "mongoose";
import { IBlogPost } from "./blog.interface";

const blogSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    isPublish: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Blog = model<IBlogPost>("Blog", blogSchema);
