import mongoose, { Document, Schema } from "mongoose";

export interface IAppointment extends Document {
  doctor: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  reason?: string;
  status: "pending" | "confirmed" | "cancelled";
}

const appointmentSchema = new Schema<IAppointment>({
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reason: { type: String },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" }
}, { timestamps: true });

export default mongoose.model<IAppointment>("Appointment", appointmentSchema);
