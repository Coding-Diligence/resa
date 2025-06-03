"use client";

export default function Reservation() {
    return (
        <div className="m-auto flex flex-col items-center justify-center w-3/4 relative">
            <h1 className="text-2xl font-bold mb-4">Gérer mes réservations</h1>
            <div className="bg-sky-950/70 p-6 rounded-2xl shadow-xl/30 w-full max-w-md">
                <p className="text-gray-300">
                    Vous pouvez consulter et gérer vos réservations ici.
                </p>
            </div>
        </div>
    )
}