import { useEffect, useState } from "react";
import api from "../api";
import type{ Appointment, AppointmentStatus } from "../../types";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    setErr(null);
    setLoading(true);
    try {
      const patientId = localStorage.getItem("patientId");
      if (!patientId) throw new Error("No patientId found. Please log in.");
      const res = await api.get<Appointment[]>(`/appointments/${patientId}`);
      setAppointments(res.data);
    } catch (e: any) {
      setErr(e?.response?.data?.message || e?.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const cancel = async (id: string) => {
    try {
      await api.patch(`/appointments/${id}/status`, { status: "cancelled" as AppointmentStatus });
      setAppointments((prev) => prev.map(a => a._id === id ? { ...a, status: "cancelled" } : a));
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Failed to cancel appointment");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>

      {err && (
        <div className="mb-4 p-3 rounded bg-red-50 text-red-700 border border-red-200">
          {err}
        </div>
      )}

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((app) => (
            <div key={app._id} className="bg-white shadow rounded-lg p-4 border">
              <h2 className="text-lg font-semibold">{app.doctor?.name ?? "Doctor"}</h2>
              <p className="text-sm text-gray-600">{app.doctor?.specialization ?? "—"}</p>
              <p className="mt-2">Date: {new Date(app.date).toLocaleDateString()}</p>
              <p>Time: {app.time}</p>
              <p
                className={`mt-2 font-semibold ${
                  app.status === "confirmed"
                    ? "text-green-600"
                    : app.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                Status: {app.status}
              </p>
              {app.status !== "cancelled" && (
                <button
                  onClick={() => cancel(app._id)}
                  className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
