// src/app.ts
import express, { Application } from "express";
import doctorRoutes from "./routers/doctors";
import appointmentRoutes from "./routers/appointments";
import cors from "cors"
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

export default app;