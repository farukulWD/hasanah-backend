import { Router } from "express";
import { donationController } from "./donation.controller";

const router = Router();

router.post("/make-donation", donationController.createDonation);
router.post("/verify-donation/:transactionId",donationController.verifyDonation)
router.post("/failed-donation/:transactionId",donationController.failedDonation)
router.post("/cancel-donation/:transactionId",donationController.cancelDonation)

export const donationRoutes = router;
