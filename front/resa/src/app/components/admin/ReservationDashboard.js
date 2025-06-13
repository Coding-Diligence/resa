'use client';

import { useState, useEffect } from 'react';
import { AdminAPI } from '@/app/services/AdminAPI';

export function ReservationDashboard() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const data = await AdminAPI.getBookings();
        setReservations(data);
      } catch (err) {
        setError(err.message || 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchReservations();
  }, []);

  const exporterCSV = () => {
    const contenu = [
      'Nom,Destination,Date',
      ...reservations.map(r => `${r.nom},${r.destination},${r.date}`)
    ];
    const blob = new Blob([contenu.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reservations.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">Erreur : {error}</p>;

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
