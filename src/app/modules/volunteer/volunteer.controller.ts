import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { volunteerService } from "./volunteer.services";
import httpStatus from "http-status";

// Create/Register a volunteer
const registerVolunteer = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await volunteerService.registerVolunteer(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Volunteer registered successfully",
    data: result,
  });
});

// Get all volunteers
const getAllVolunteers = catchAsync(async (req, res) => {
  const result = await volunteerService.getAllVolunteers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Volunteers retrieved successfully",
    data: result,
  });
});

// Get single volunteer by ID
const getSingleVolunteer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await volunteerService.getSingleVolunteer(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Volunteer retrieved successfully",
    data: result,
  });
});

// Update volunteer by ID
const updateVolunteer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await volunteerService.updateVolunteer(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Volunteer updated successfully",
    data: result,
  });
});

// Delete volunteer by ID
const deleteVolunteer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await volunteerService.deleteVolunteer(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Volunteer deleted successfully",
    data: result,
  });
});

export const volunteerController = {
  registerVolunteer,
  getAllVolunteers,
  getSingleVolunteer,
  updateVolunteer,
  deleteVolunteer,
};
