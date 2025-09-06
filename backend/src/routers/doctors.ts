import { Router } from "express";
import { getDoctors, getDoctorById, contactDoctor } from "../controlleres/doctorController";

const router = Router();

router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.post("/:id/contact", contactDoctor);

export default router;
