import AppError from "../../errors/AppError";
import { IVolunteerApplication } from "./volunteer.interface";
import httpStatus from "http-status";
import { Volunteer } from "./volunteer.model";
import { Types } from "mongoose";

// Create/Register a new volunteer
const registerVolunteer = async (volunteerData: IVolunteerApplication) => {
  if (!volunteerData) {
    throw new AppError(httpStatus.BAD_REQUEST, "Volunteer data is required");
  }

  const result = await Volunteer.create(volunteerData);
  return result;
};

// Get all volunteers
const getAllVolunteers = async () => {
  const result = await Volunteer.find();
  return result;
};

// Get a single volunteer by ID
const getSingleVolunteer = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Volunteer ID");
  }

  const volunteer = await Volunteer.findById(id);
  if (!volunteer) {
    throw new AppError(httpStatus.NOT_FOUND, "Volunteer not found");
  }

  return volunteer;
};

// Update volunteer by ID
const updateVolunteer = async (id: string, updateData: Partial<IVolunteerApplication>) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Volunteer ID");
  }

  const updatedVolunteer = await Volunteer.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedVolunteer) {
    throw new AppError(httpStatus.NOT_FOUND, "Volunteer not found");
  }

  return updatedVolunteer;
};

// Delete volunteer by ID
const deleteVolunteer = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Volunteer ID");
  }

  const deletedVolunteer = await Volunteer.findByIdAndDelete(id);

  if (!deletedVolunteer) {
    throw new AppError(httpStatus.NOT_FOUND, "Volunteer not found");
  }

  return deletedVolunteer;
};

export const volunteerService = {
  registerVolunteer,
  getAllVolunteers,
  getSingleVolunteer,
  updateVolunteer,
  deleteVolunteer,
};
