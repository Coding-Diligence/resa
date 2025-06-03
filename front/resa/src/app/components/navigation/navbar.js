import Link from "next/link";
import Compte from "../partials/compte";

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
                        <Link href="/liste-reservation" className="hover:text-gray-300">
                            Gérer mes réservations
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