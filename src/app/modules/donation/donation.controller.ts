import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { donationService } from "./donation.service";
import httpStatus from "http-status";

const createDonation = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await donationService.createDonation(data);
  console.log(result)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donation initiate success",
    data: result,
  });
});

export const donationController = {
  createDonation,
};
