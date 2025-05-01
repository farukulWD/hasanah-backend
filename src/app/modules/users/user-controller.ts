import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";
import httpStatus  from "http-status";

const createUser = catchAsync(async (req, res) => {
    const userData = req.body;
    const user  = await userServices.createUserService(userData);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User created successfully",
        data: user,
    })
})


const getAllUsers = catchAsync(async (req, res) => {
    const filters = req.query.filters || {};
    const paginationOptions = req.query.paginationOptions || {};

    const users = await userServices.getAllUsersService();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully",
        data: users,
    })
})


const getSingleUser = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const user = await userServices.getSingleUserService(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User retrieved successfully",
        data: user,
    })
})



const updateUser = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    const user = await userServices.updateUserService(userId, userData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User updated successfully",
        data: user,
    })
})



const deleteUser = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const user = await userServices.deleteUserService(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User deleted successfully",
        data: user,
    })
})


const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
}
export default userController;