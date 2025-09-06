import { motion } from "framer-motion";

const testimonials = [
  { name: "Alice Johnson", feedback: "Easy to book appointments. Very helpful!", avatar: "https://i.pravatar.cc/150?img=32", rating: 5 },
  { name: "John Doe", feedback: "Found the right doctor quickly. Highly recommended!", avatar: "https://i.pravatar.cc/150?img=12", rating: 4 },
  { name: "Emma Smith", feedback: "Professional and fast service. Highly satisfied!", avatar: "https://i.pravatar.cc/150?img=47", rating: 5 }
];

export default function Testimonials() {
  return (
    <motion.section className="bg-blue-50 py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-700">What Patients Say</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full border-4 border-blue-200 mb-4" />
            <p className="italic text-gray-600 mb-4">"{t.feedback}"</p>
            <h3 className="font-semibold text-lg text-gray-800">{t.name}</h3>
            <div className="flex mt-2">
              {Array(5).fill(0).map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < t.rating ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.165c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.955c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.955a1 1 0 00-.364-1.118L2.04 9.382c-.784-.57-.38-1.81.588-1.81h4.165a1 1 0 00.95-.69l1.286-3.955z" />
                </svg>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
