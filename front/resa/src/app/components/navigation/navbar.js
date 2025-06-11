"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Compte from "../partials/compte";

export default function Navbar() {
  const pathname = usePathname(); // Récupère le chemin actuel
  
  return (
    <div className="bg-sky-950 ">
      <nav className="flex items-center justify-between text-white px-8 py-2 mx-auto">
        <div className="flex gap-10">
          <img src="/assets/logoresa-removebg-preview.PNG" alt="Logo Resa" className="h-20" />
          <ul className="flex space-x-6 justify-center items-center">
            <li>
              <Link href="/admin" className={`hover:text-gray-300 font-medium text-lg ${pathname === "/admin" ? "border-b-2 border-[#e76f51]" : ""}`}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/" className={`hover:text-gray-300 font-medium text-lg ${pathname === "/" ? "border-b-2 border-[#e76f51]" : ""}`}>
                Réserver
              </Link>
            </li>
            <li>
              <Link href="/reservation-list" className={`hover:text-gray-300 font-medium text-lg ${pathname === "/reservation-list" ? "border-b-2 border-[#e76f51]" : ""}`}>
                Gérer mes réservations
              </Link>
            </li>
          </ul>
        </div>
        <ul className="flex justify-center items-center">
          <li>
            <Compte />
          </li>
        </ul>
      </nav>
    </div>
  );
}
