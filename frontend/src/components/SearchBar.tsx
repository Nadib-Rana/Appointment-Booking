import { motion } from "framer-motion";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <motion.section
      className="max-w-4xl mx-auto my-10 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <input
        type="text"
        placeholder="Search by name or specialization..."
        className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </motion.section>
  );
}
