import Link from "next/link";
import Compte from "../partials/compte";
import Reservation from "@/app/pages/Reservation";

export default function Navbar() {
  return (
    <div className="bg-sky-950">
      <nav className="flex items-center justify-between p-4 text-white container">
        <div className="text-lg font-bold">RESA</div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Réserver
            </Link>
          </li>
          <li>
            <Link href="/reservation" className="hover:text-gray-300">
              Mes réservations
            </Link>
          </li>
          <li>
            <Link href="/liste-reservation" className="hover:text-gray-300">
              Gérer mes réservations
            </Link>
          </li>
          <li>
            <Link href="/profil" className="hover:text-gray-300">
              Mon compte
            </Link>
          </li>
          <li>
            <Link href="/login" className="hover:text-gray-300">
              Connexion
            </Link>
          </li>
          <li>
            <Link href="/register" className="hover:text-gray-300">
              Inscription
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}