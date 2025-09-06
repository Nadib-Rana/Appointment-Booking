import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function BookAppointment() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  // For now, simulate logged-in patient with a stored id
  useEffect(() => {
    if (!localStorage.getItem("patientId")) {
      // TODO: replace with real auth; using placeholder here
      localStorage.setItem("patientId", "000000000000000000000000"); // dummy ObjectId-like
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const patientId = localStorage.getItem("patientId");
    if (!doctorId || !patientId) {
      setError("Missing doctor or patient information.");
      return;
    }

    try {
      await api.post("/appointments/book", {
        doctorId,
        patientId,
        date: new Date(date).toISOString(), // backend expects Date
        time, // e.g. "10:30"
        reason,
      });
      navigate("/appointments");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to book appointment");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Book Appointment</h2>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-50 text-red-700 border border-red-200">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm font-medium">Date</span>
          <input
            type="date"
            className="mt-1 w-full border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Time</span>
          <input
            type="time"
            className="mt-1 w-full border p-2 rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Reason (optional)</span>
          <textarea
            placeholder="Reason for visit"
            className="mt-1 w-full border p-2 rounded"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
