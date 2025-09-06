import { useEffect, useState } from "react";
import api from "../api";
import type { Doctor } from "../../types";
import FeaturedDoctors from "../components/FeaturedDoctors";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import HowItWorks from "../components/HowItWorks";
import Statistics from "../components/Statistics";
import Testimonials from "../components/Testimonials";
import FooterCTA from "../components/FooterCTA";


export default function Home() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<Doctor[]>("/doctors");
        setDoctors(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <SearchBar search={search} setSearch={setSearch} />
      {!loading && <FeaturedDoctors doctors={filteredDoctors} />}
      <HowItWorks />
      <Statistics />
      <Testimonials />
      <FooterCTA />
    </div>
  );
}
