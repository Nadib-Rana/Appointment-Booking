export interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  experience: number;
  clinic?: {
    name?: string;
    address?: string;
    city?: string;
  };
  availability: {
    date: string;   // ISO string
    slots: string[]; // e.g., ["10:00","11:30"]
  }[];
  profileImage?: string;
}

export type AppointmentStatus = "pending" | "confirmed" | "cancelled";

export interface Appointment {
  _id: string;
  doctor: Pick<Doctor, "_id" | "name" | "specialization" | "clinic">;
  date: string;  // ISO string
  time: string;  // "HH:mm"
  reason?: string;
  status: AppointmentStatus;
}
