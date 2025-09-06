import { motion } from "framer-motion";

const steps = [
  { icon: "🔍", title: "Search Doctors", desc: "Find doctors by specialization, location, and availability." },
  { icon: "📅", title: "Book Appointment", desc: "Select available slots and schedule appointments instantly." },
  { icon: "✅", title: "Get Confirmation", desc: "Receive instant confirmation and reminders via notifications." }
];

export default function HowItWorks() {
  return (
    <motion.section className="bg-white py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-700">How It Works</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="p-6 border rounded-lg shadow hover:shadow-lg transition"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-blue-600 mb-4 text-4xl">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
