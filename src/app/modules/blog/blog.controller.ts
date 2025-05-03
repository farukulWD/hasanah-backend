import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog.services";
import httpStatus from "http-status";

const createBlog = catchAsync(async (req, res) => {
  const { blogData } = req.body;
  const { userId } = req.user;
  blogData.author = userId;

  const result = await blogServices.createBlog(req.file, blogData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog Created success",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const allBlogs = await blogServices.getAllBlogs();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog Retrieve success",
    data: allBlogs,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body.blogData;

  const result = await blogServices.updateBlog(id, updatedData, req.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await blogServices.deleteBlog(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog deleted successfully",
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const blog = await blogServices.getSingleBlog(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single blog fetched successfully",
    data: blog,
  });
});

export const blogController = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog
};
