import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import type { Doctor } from "../../types/index";
import { motion } from "framer-motion";

export default function DoctorProfile() {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await api.get<Doctor>(`/doctors/${id}`);
        setDoctor(res.data);
      } catch (e: any) {
        setError(e?.response?.data?.message || "Failed to load doctor");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="p-6 text-center text-gray-600">Loading doctor profile...</div>;
  if (error || !doctor) return <div className="p-6 text-center text-red-600">{error ?? "Doctor not found"}</div>;

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Profile Card */}
      <motion.div
        className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {doctor.profileImage ? (
          <motion.img
            src={doctor.profileImage}
            alt={doctor.name}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
        ) : (
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gray-200 flex items-center justify-center shadow-md">
            <span className="text-gray-400 text-4xl">👨‍⚕️</span>
          </div>
        )}

        <div className="flex-1">
          <motion.h1 
            className="text-3xl font-bold text-gray-800"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {doctor.name}
          </motion.h1>
          <motion.p 
            className="text-blue-600 font-semibold mt-1"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {doctor.specialization}
          </motion.p>
          {doctor.clinic?.name && doctor.clinic?.city && (
            <motion.p 
              className="text-gray-600 mt-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {doctor.clinic.name}, {doctor.clinic.city}
            </motion.p>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <Link
              to={`/book/${doctor._id}`}
              className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Book Appointment
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Additional Info Grid */}
      <motion.div
        className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <InfoCard title="Experience" content={`${doctor.experience ?? "Not specified"} years`} />
        <InfoCard title="Consultation Fee" content={`$${doctor.fee ?? "N/A"}`} />
        <InfoCard title="Job Location" content={doctor.joblocation ?? "Not specified"} />
        <InfoCard title="Designation" content={doctor.designation ?? "Not specified"} />
        <InfoCard
          title="Available Days"
          content={
            doctor.availability?.length
              ? doctor.availability.map((slot, idx) => (
                  <div key={idx}>
                    {new Date(slot.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })} — {slot.slots.join(", ")}
                  </div>
                ))
              : "Not specified"
          }
        />
        <InfoCard
          title="Contact"
          content={
            <>
              📧 {doctor.email} <br />
              📞 {doctor.phone ?? "Not provided"}
            </>
          }
        />
        <InfoCard
          title="Education"
          content={
            doctor.education?.length ? (
              <ul className="list-disc pl-4 text-gray-700">
                {doctor.education.map((edu, idx) => (
                  <li key={idx}>
                    {edu.degree} in {edu.fieldOfStudy ?? "General"} — {edu.institution} ({edu.year})
                  </li>
                ))}
              </ul>
            ) : (
              "Not specified"
            )
          }
        />
      </motion.div>
    </motion.div>
  );
}

// Reusable InfoCard component
function InfoCard({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>
      <div className="text-gray-700">{content}</div>
    </div>
  );
}