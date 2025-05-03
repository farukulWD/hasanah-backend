import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { IBlogPost } from "./blog.interface";
import httpStatus from "http-status";
import { Blog } from "./blog.model";

const createBlog = async (file: any, blogData: IBlogPost) => {
  if (!blogData) {
    throw new AppError(httpStatus.BAD_REQUEST, "Blog data is required");
  }

  if (file) {
    const imageName = `${blogData?.title}-${Date.now()}`;
    const path = file?.path;

    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    console.log(secure_url);
    blogData.coverImage = secure_url as string;
  }

  const result = await Blog.create(blogData);
  return result;
};

const getAllBlogs = async () => {
  const blogs = await Blog.find({}).populate("author");
  return blogs;
};

const updateBlog = async (
  id: string,
  updatedData: Partial<IBlogPost>,
  file?: any
) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  if (file) {
    const imageName = `${updatedData?.title || blog.title}-${Date.now()}`;
    const path = file.path;

    // Upload new image to Cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    updatedData.coverImage = secure_url as string;
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  return updatedBlog;
};

const deleteBlog = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const getSingleBlog = async (id: string) => {
  const blog = await Blog.findById(id).populate("author");
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }
  return blog;
};

export const blogServices = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog,
};
