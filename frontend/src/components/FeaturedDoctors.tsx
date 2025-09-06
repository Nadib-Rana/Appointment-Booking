import { motion } from "framer-motion";
import type { Doctor } from "../../types";
import DoctorCard from "./DoctorCard";
import { Link } from "react-router-dom";

interface Props {
  doctors: Doctor[];
}

export default function FeaturedDoctors({ doctors }: Props) {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="max-w-6xl mx-auto px-4 mb-16"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <motion.h2
        className="text-2xl font-bold mb-6 text-gray-700"
        variants={cardVariants}
      >
        Featured Doctors
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {doctors.slice(0, 6).map((doctor) => (
          <motion.div
            key={doctor._id}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <DoctorCard doctor={doctor} />
          </motion.div>
        ))}
      </motion.div>
      <div className="flex justify-center mt-8">
        <Link
          to="/doctors"
          className="text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
        >
          View All Doctors
        </Link>
      </div>
    </motion.section>
  );
}