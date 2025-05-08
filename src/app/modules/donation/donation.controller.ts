import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { donationService } from "./donation.service";
import httpStatus from "http-status";

const createDonation = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await donationService.createDonation(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donation initiate success",
    data: result,
  });
});

const verifyDonation = catchAsync(async (req, res) => {
  const { transactionId } = req.params;
  const result = await donationService.verifyDonation(transactionId);

 
  const url = config.CLIENT_URL;
  if (result?.status === "VALIDATED") {
    res.redirect(`${url}/donation`);
  }
});
const failedDonation = catchAsync(async (req, res) => {
  const { transactionId } = req.params;
  const result = await donationService.failedDonation(transactionId);

 
  const url = config.CLIENT_URL;
  if (result?.status === "FAILED") {
    res.redirect(`${url}/donation/failed`);
  }
});
const cancelDonation = catchAsync(async (req, res) => {
  const { transactionId } = req.params;
  const result = await donationService.cancelDonation(transactionId);


  const url = config.CLIENT_URL;
  if (result?.status === "CANCEL") {
    res.redirect(`${url}/donation/cancel`);
  }
});

export const donationController = {
  createDonation,
  verifyDonation,
  failedDonation,
  cancelDonation,
};
