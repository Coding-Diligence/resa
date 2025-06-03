"use client";
import Link from "next/link";
import { useState } from "react";

export default function Reservation() {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => setter(Math.max(0, value - 1));

  return (
    <form className="w-3/4 p-6 relative mt-10 bg-sky-950/70 rounded-2xl shadow-xl/30">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Programmer un voyage</h2>

      {/* Destination */}
      <div className="mb-4">
        <label htmlFor="destination" className="block text-sm font-medium text-gray-300">Destination</label>
        <input
          type="text"
          id="destination"
          name="destination"
          required
          className="mt-1 block w-full p-2 border border-gray-300 bg-white text-sky-950 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Où souhaitez-vous partir ?"
        />
      </div>

      {/* Dates */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Quand souhaitez-vous voyager ?</label>
        <div className="flex space-x-4">
          <input
            type="date"
            name="startDate"
            required
            className="block w-1/2 p-2 border border-gray-300 bg-white text-sky-950 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="date"
            name="endDate"
            required
            className="block w-1/2 p-2 border border-gray-300 bg-white text-sky-950 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Compteurs */}
      <div className="mb-6 space-y-4 flex flex-row">
        {[
          { label: "Adultes", value: adults, setValue: setAdults },
          { label: "Enfants", value: children, setValue: setChildren },
          { label: "Animaux", value: pets, setValue: setPets },
        ].map(({ label, value, setValue }, index) => (
          <div key={index} className="flex flex-col">
            <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            <div className="flex items-center space-x-4 m-2 rounded-xl bg-white">
              <button
                type="button"
                onClick={() => decrement(setValue, value)}
                className="px-3 py-1 bg-white text-sky-800 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                ➖
              </button>
              <span className="text-sky-950 font-semibold">{value}</span>
              <button
                type="button"
                onClick={() => increment(setValue, value)}
                className="px-3 py-1 bg-white text-sky-950 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                ➕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <Link
          href={`/liste-reservation?adults=${adults}&children=${children}&pets=${pets}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Rechercher
        </Link>
      </div>
    </form>
  );
}
