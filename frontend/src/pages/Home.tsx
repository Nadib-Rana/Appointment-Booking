import { useEffect, useState } from "react";
import api from "../api";
import type { Doctor } from "../../types";
import HeroSection from "../commponets/HeroSection";
import SearchBar from "../commponets/SearchBar";
import FeaturedDoctors from "./FeaturedDoctors";
import HowItWorks from "../commponets/HowItWorks";
import Statistics from "../commponets/Statistics";
import Testimonials from "../commponets/Testimonials";
import FooterCTA from "../commponets/FooterCTA";

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
