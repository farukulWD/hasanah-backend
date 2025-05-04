import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { IDonation } from "./donation.interface";
import { generateTransactionId } from "../../utils/generateTransactionId";
import { Project } from "../project/project.model";
import config from "../../config";
const SSLCommerzPayment = require("sslcommerz-lts");

const createDonation = async (data: IDonation) => {
  if (!data) {
    throw new AppError(httpStatus.BAD_REQUEST, "Donation data is required");
  }

  if (!data?.projectId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Project id is required");
  }

  if (!data?.amount) {
    throw new AppError(httpStatus.BAD_REQUEST, "Amount is required");
  }

  if (!data?.donorEmailOrPhone) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email or phone is required");
  }

  const project = await Project.findById(data?.projectId);
  if (!project) {
    throw new AppError(httpStatus.BAD_REQUEST, "Project not found");
  }

  const tran_id = await generateTransactionId();

  const checkEmailOrPhone = data?.donorEmailOrPhone.includes("@");
 

  const donationData = {
    total_amount: data?.amount,
    currency: "BDT",
    tran_id: tran_id.toString(),
    success_url: "http://localhost:3030/success",
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "NO",
    product_name: project?.title,
    product_category: "donation",
    product_profile: "general",
    cus_email: checkEmailOrPhone ? data?.donorEmailOrPhone : "",
    cus_phone: !checkEmailOrPhone ? "000" : data?.donorEmailOrPhone,
  };

  const store_id = config.store_id;
  const store_passwd = config.store_passwd;
  const is_live = false;

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  const apiResponse = await sslcz.init(donationData);
//   console.log(apiResponse)
  return { gateway_pageURL: apiResponse.GatewayPageURL };
};

export const donationService = { createDonation };
