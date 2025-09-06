import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const navLink =
    "px-3 py-2 rounded hover:bg-blue-700 transition aria-[current=page]:bg-blue-800";

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">Doctor Booking</Link>
        <div className="flex gap-2">
          <NavLink to="/" className={navLink} end>Doctors</NavLink>
          <NavLink to="/appointments" className={navLink}>My Appointments</NavLink>
        </div>
      </div>
    </nav>
  );
}
