// Doctor model
export interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  experience: number;
  email: string;
  phone?: string;
  fee?: number;
  joblocation?: string;
  designation?: string;
  profileImage?: string;
  clinic?: {
    name?: string;
    address?: string;
    city?: string;
  };
  availability: {
    date: string;        // ISO string
    slots: string[];     // e.g., ["10:00", "11:30"]
  }[];
  education?: {
    degree: string;
    institution: string;
    year: number;
    fieldOfStudy?: string;
  }[];
  bio?: string;
}

// Appointment status enum-like type
export type AppointmentStatus = "pending" | "confirmed" | "cancelled";

// Appointment model
export interface Appointment {
  _id: string;
  doctor: Pick<Doctor, "_id" | "name" | "specialization" | "clinic">;
  date: string;         // ISO string
  time: string;         // "HH:mm"
  reason?: string;
  status: AppointmentStatus;
  createdAt?: string;
  updatedAt?: string;
}


