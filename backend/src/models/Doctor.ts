import mongoose, { Schema } from "mongoose";
import { IDoctor } from "../interfaces/Doctor";

const doctorSchema = new Schema<IDoctor>({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },

  availability: [
    {
      date: { type: Date, required: true },
      slots: [{ type: String }]
    }
  ],

  clinic: {
    name: { type: String },
    address: { type: String },
    city: { type: String }
  },

  profileImage: { type: String },

  education: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      year: {
        type: Number,
        required: true,
        validate: {
          validator: (value: number) => value <= new Date().getFullYear(),
          message: "Year cannot be in the future"
        }
      },
      fieldOfStudy: { type: String } 
    }
  ]
}, { timestamps: true });

export default mongoose.model<IDoctor>("Doctor", doctorSchema);