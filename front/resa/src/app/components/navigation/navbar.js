import Link from "next/link";
import Compte from "../partials/compte";
import Reservation from "@/app/pages/Reservation";

export default function Navbar() {
    return (
        <div className="bg-sky-950">
            <nav className="flex items-center justify-between p-4 text-white container">
                <div className="text-lg font-bold"><Link href="/" className="hover:text-gray-300">RESA</Link></div>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="hover:text-gray-300">
                            Réserver
                        </Link>
                    </li>
                    <li>
                        <Link href="/reservation-list" className="hover:text-gray-300">
                            Mes réservations
                        </Link>
                    </li>
                    <li>
                        <Compte />
                    </li>
                </ul>
            </nav>
        </div>
    )
}