import { Router } from "express";
import { donationController } from "./donation.controller";

const router = Router();

router.post("/make-donation", donationController.createDonation);

export const donationRoutes = router;
