import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function FooterCTA() {
  return (
    <motion.section
      className="bg-blue-600 text-white py-12 px-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl font-bold mb-4">Ready to Book an Appointment?</h2>
      <p className="mb-4 text-white/90">Start finding the right doctor for you today.</p>
      <Link
        to="/doctors"
        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
      >
        Find a Doctor
      </Link>
    </motion.section>
  );
}
