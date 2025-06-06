'use client';

import { useState } from 'react';

export default function ReservationDashboard() {
  const [reservations] = useState([
    { id: 1, nom: 'Jean Dupont', destination: 'Nice - Bastia', date: '2025-07-12' },
    { id: 2, nom: 'Marie Curie', destination: 'Marseille - Ajaccio', date: '2025-08-05' },
  ]);

  const exporterCSV = () => {
    const contenu = ['Nom,Destination,Date', ...reservations.map(r => `${r.nom},${r.destination},${r.date}`)];
    const blob = new Blob([contenu.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reservations.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Réservations</h3>
      <table className="w-full table-auto border mb-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Nom</th>
            <th className="border px-4 py-2">Destination</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id}>
              <td className="border px-4 py-2">{r.nom}</td>
              <td className="border px-4 py-2">{r.destination}</td>
              <td className="border px-4 py-2">{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={exporterCSV} className="bg-green-600 text-white px-4 py-2 rounded">
        Exporter en CSV
      </button>
    </div>
  );
}
