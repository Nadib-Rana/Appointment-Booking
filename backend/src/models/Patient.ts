import mongoose, { Document, Schema } from "mongoose";

export interface IPatient extends Document {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

const patientSchema = new Schema<IPatient>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IPatient>("Patient", patientSchema);
