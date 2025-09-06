import { Request, Response } from "express";
import Appointment, { IAppointment } from "../models/Appointment";

// Book appointment
export const bookAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { doctorId, patientId, date, time, reason } = req.body;

    const appointment = new Appointment({
      doctor: doctorId,
      patient: patientId,
      date,
      time,
      reason
    });

    await appointment.save();
    res.json({ success: true, message: "Appointment booked successfully", appointment });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get patient appointments
export const getPatientAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointments = await Appointment.find({ patient: req.params.patientId })
      .populate("doctor", "name specialization clinic")
      .sort({ date: 1 });

    res.json(appointments);
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update appointment status
export const updateAppointmentStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body as { status: "pending" | "confirmed" | "cancelled" };
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }

    appointment.status = status;
    await appointment.save();

    res.json({ success: true, message: "Status updated", appointment });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
