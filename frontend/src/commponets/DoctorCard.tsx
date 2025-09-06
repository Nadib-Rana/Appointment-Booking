import { Link } from "react-router-dom";
import type {Doctor} from "../../types/index";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <div className="flex items-start gap-3">
        {doctor.profileImage ? (
          <img
            src={doctor.profileImage}
            alt={doctor.name}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gray-200" />
        )}
        <div>
          <h2 className="text-lg font-semibold">{doctor.name}</h2>
          <p className="text-gray-600">{doctor.specialization}</p>
          <p className="text-sm mt-1">{doctor.clinic?.city ?? "—"}</p>
        </div>
      </div>
      <Link
        to={`/doctors/${doctor._id}`}
        className="mt-4 inline-block bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600"
      >
        View Profile
      </Link>
    </div>
  );
}
