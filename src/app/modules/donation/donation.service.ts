import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { IDonation } from "./donation.interface";
import { generateTransactionId } from "../../utils/generateTransactionId";
import { Project } from "../project/project.model";
import config from "../../config";
import { Donation } from "./donation.model";
const SSLCommerzPayment = require("sslcommerz-lts");

const store_id = config.store_id;
const store_passwd = config.store_passwd;
const is_live = false;

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

  data.transactionId = tran_id;

  const checkEmailOrPhone = data?.donorEmailOrPhone.includes("@");

  const donationData = {
    total_amount: data?.amount,
    currency: "BDT",
    tran_id: tran_id.toString(),
    success_url: `http://localhost:5000/api/v1/donation/verify-donation/${tran_id}`,
    fail_url: `http://localhost:5000/api/v1/donation/failed-donation/${tran_id}`,
    cancel_url: `http://localhost:5000/api/v1/donation/cancel-donation/${tran_id}`,
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "NO",
    product_name: project?.title,
    product_category: "donation",
    product_profile: "general",
    cus_email: checkEmailOrPhone ? data?.donorEmailOrPhone : "",
    cus_phone: !checkEmailOrPhone ? "000" : data?.donorEmailOrPhone,
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  const apiResponse = await sslcz.init(donationData);

  if (apiResponse) {
    const result = await Donation.create(data);
  }
  //   console.log(apiResponse)
  return { gateway_pageURL: apiResponse.GatewayPageURL };
};

const verifyDonation = async (transactionId: string) => {
  if (!transactionId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Transaction id is required");
  }

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  const getPayment = await sslcz.transactionQueryByTransactionId({
    tran_id: transactionId.toString(),
  });

  const data = {
    val_id: getPayment?.element[0]?.val_id,
  };

  const verifyData = await sslcz.validate(data);

  if (verifyData?.status === "VALIDATED") {
    const updateDonation = await Donation.findOneAndUpdate(
      { transactionId },
      { status: "completed" },
      { new: true }
    );
  }

  return verifyData;
};
const failedDonation = async (transactionId: string) => {
  if (!transactionId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Transaction id is required");
  }

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  const getPayment = await sslcz.transactionQueryByTransactionId({
    tran_id: transactionId.toString(),
  });

  const paymentData = getPayment?.element[0];

  if (paymentData?.status === "FAILED") {
    const updateDonation = await Donation.findOneAndUpdate(
      { transactionId },
      { status: "failed" },
      { new: true }
    );
  }

  return paymentData;
};
const cancelDonation = async (transactionId: string) => {
  if (!transactionId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Transaction id is required");
  }

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  const getPayment = await sslcz.transactionQueryByTransactionId({
    tran_id: transactionId.toString(),
  });

  const paymentData = getPayment?.element[0];

  if (paymentData?.status === "CANCEL") {
    const updateDonation = await Donation.findOneAndUpdate(
      { transactionId },
      { status: "cancel" },
      { new: true }
    );
  }

  return paymentData;
};

export const donationService = {
  createDonation,
  verifyDonation,
  failedDonation,
  cancelDonation
};
