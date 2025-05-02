import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { projectService } from "./project.service";

const createProject = catchAsync(async (req, res) => {
  const file = req.file;
  const {projectData} = req.body;
 
  const project = await projectService.createProject(file, projectData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project created successfully",
    data: project,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const projects = await projectService.getAllProjects();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Projects retrieved successfully",
    data: projects,
  });
});
const getProjectById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await projectService.getProjectById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project retrieved successfully",
    data: project,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const projectData = req.body;
  const project = await projectService.updateProject(id, projectData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project updated successfully",
    data: project,
  });
});
const deleteProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await projectService.deleteProject(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project deleted successfully",
    data: project,
  });
});

export const projectController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
