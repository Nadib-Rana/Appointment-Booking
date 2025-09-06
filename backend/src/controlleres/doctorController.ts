import { Request, Response } from "express";
import Doctor from "../models/Doctor";
import { IDoctor } from "../interfaces/Doctor";

// GET all doctors
export const getDoctors = async (req: Request, res: Response): Promise<void> => {
  try {
    const { specialization, city } = req.query as { specialization?: string; city?: string };
    const filters: Record<string, any> = {};
    if (specialization) filters.specialization = specialization;
    if (city) filters["clinic.city"] = city;

    const doctors: IDoctor[] = await Doctor.find(filters);
    res.json(doctors);
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// GET doctor by ID
export const getDoctorById = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      res.status(404).json({ message: "Doctor not found" });
      return;
    }
    res.json(doctor);
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// POST message to doctor
export const contactDoctor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body;
    // In production: send email via Nodemailer
    res.json({ success: true, message: "Message sent to doctor" });
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
