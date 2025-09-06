import { useEffect, useState } from "react";
import api from "../api";
import type { Doctor } from "../../types/index";
import DoctorCard from "../commponets/DoctorCard";
import { motion } from "framer-motion";

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<Doctor[]>("/doctors");
        setDoctors(res.data);
      } catch (e: any) {
        setError(e?.message || "Failed to load doctors");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6 text-center text-gray-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-600 text-center">{error}</div>;

  // Framer Motion variants for staggered animation
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 100 } },
  };

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {doctors.map((d) => (
        <motion.div key={d._id} variants={cardVariants} whileHover={{ scale: 1.05 }}>
          <DoctorCard doctor={d} />
        </motion.div>
      ))}
    </motion.div>
  );
}
