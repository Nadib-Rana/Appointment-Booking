import { motion } from "framer-motion";
import type { Doctor } from "../../types";
import DoctorCard from "../commponets/DoctorCard";

interface Props {
  doctors: Doctor[];
}

export default function FeaturedDoctors({ doctors }: Props) {
  return (
    <motion.section
      className="max-w-6xl mx-auto px-4 mb-16"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.h2 className="text-2xl font-bold mb-6 text-gray-700" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
        Featured Doctors
      </motion.h2>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.slice(0, 6).map((doctor) => (
          <motion.div key={doctor._id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} whileHover={{ scale: 1.05 }}>
            <DoctorCard doctor={doctor} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
