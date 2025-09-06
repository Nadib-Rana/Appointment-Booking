import { Router } from "express";
import { bookAppointment, getPatientAppointments, updateAppointmentStatus } from "../controlleres/appointmentController";

const router = Router();

router.post("/book", bookAppointment);
router.get("/:patientId", getPatientAppointments);
router.patch("/:id/status", updateAppointmentStatus);

export default router;
