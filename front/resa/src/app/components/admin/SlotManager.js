'use client';

import { useState, useEffect } from 'react';
import { AdminAPI } from '@/app/services/AdminAPI';

export function SlotManager() {
  const [slots, setSlots] = useState([]);
  const [jour, setJour] = useState('');
  const [heure, setHeure] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les créneaux au montage
  useEffect(() => {
    async function fetchSlots() {
      try {
        const data = await AdminAPI.getSlots();
        setSlots(data);
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement des créneaux');
      } finally {
        setLoading(false);
      }
    }
    fetchSlots();
  }, []);

  const ajouterCreneau = async () => {
    if (!jour || !heure) return;
    try {
      const nouveau = await AdminAPI.createSlot({ jour, heure });
      setSlots((prev) => [...prev, nouveau]);
      setJour('');
      setHeure('');
    } catch (err) {
      alert(`Erreur lors de l'ajout du créneau : ${err.message}`);
    }
  };

  const supprimerCreneau = async (id) => {
    try {
      await AdminAPI.deleteSlot(id);
      setSlots((prev) => prev.filter((slot) => slot.id !== id));
    } catch (err) {
      alert(`Erreur lors de la suppression du créneau : ${err.message}`);
    }
  };

  if (loading) return <p>Chargement des créneaux...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h4 className="text-xl font-semibold mb-4">Ajouter un créneau</h4>
      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Jour"
          value={jour}
          onChange={(e) => setJour(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Heure (ex : 08:00 - 12:00)"
          value={heure}
          onChange={(e) => setHeure(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={ajouterCreneau}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </div>

      <h4 className="text-xl font-semibold mb-2">Créneaux existants</h4>
      <ul className="space-y-2">
        {slots.map((slot) => (
          <li
            key={slot.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            {slot.jour} – {slot.heure}
            <button
              onClick={() => supprimerCreneau(slot.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
