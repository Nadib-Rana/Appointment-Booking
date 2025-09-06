import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroIm from "../../public/Stethoscope-for-medical-check-up-on-transparent-background-PNG-removebg-preview.png"
export default function HeroSection() {
  return (
    <motion.section
      className="bg-blue-600 text-white py-24 px-6 md:px-12 flex flex-col-reverse md:flex-row items-center gap-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="md:w-1/2">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 leading-snug"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Find the Best Doctors <br /> Near You Instantly
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-6 text-white/90"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Easily book appointments, explore doctors by specialization, and get timely care—all in one platform.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Link
            to="/doctors"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Explore Doctors
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="md:w-1/2 flex justify-center"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <img
          src={HeroIm}
          alt="Doctor Illustration"
          className="w-80 h-80 md:w-full md:h-auto"
        />
      </motion.div>
    </motion.section>
  );
}
