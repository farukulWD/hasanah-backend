import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { IProject } from "./project.interface";
import { Project } from "./project.model";

const createProject = async (file: any, projectData: IProject) => {
  if (!projectData) {
    throw new Error("Project data is required");
  }

  if (file) {
    const imageName = `${projectData?.title}-${Date.now()}`;
    const path = file?.path;

    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    console.log(secure_url);
    projectData.image = secure_url as string;
  }

  // create project in database
  const project = await Project.create(projectData);

  return project;
};

const getAllProjects = async () => {
  const projects = await Project.find({}).sort({ createdAt: -1 });
  return projects;
};
const getProjectById = async (id: string) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new Error("Project not found");
  }
  return project;
};

const updateProject = async (id: string, projectData: IProject) => {
  if (!id) {
    throw new Error("Project ID is required");
  }
  if (!projectData) {
    throw new Error("Project data is required");
  }
  // find project by id and update it
  if (projectData) {
    const project = await Project.findByIdAndUpdate(id, projectData, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  }
};
const deleteProject = async (id: string) => {
  if (!id) {
    throw new Error("Project ID is required");
  }
  // find project by id and delete it
  const project = await Project.findByIdAndDelete(id);
  if (!project) {
    throw new Error("Project not found");
  }
  return project;
};

export const projectService = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
