import { motion } from "framer-motion";
import { Counter } from "./Counter"; // import the animated counter

const stats = [
  { number: 500, suffix: "+", label: "Doctors" },
  { number: 10000, suffix: "+", label: "Appointments Booked" },
  { number: 99, suffix: "%", label: "Satisfied Patients" }
];

export default function Statistics() {
  return (
    <motion.section className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row justify-around items-center gap-8 text-center">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          className="bg-white shadow rounded-lg p-6 w-40 hover:shadow-lg transition"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2 }}
        >
          <p className="text-3xl font-bold text-blue-600">
            <Counter end={stat.number} suffix={stat.suffix} />
          </p>
          <p className="mt-2 text-gray-700">{stat.label}</p>
        </motion.div>
      ))}
    </motion.section>
  );
}
