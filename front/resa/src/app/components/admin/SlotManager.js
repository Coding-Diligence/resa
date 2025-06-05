'use client';

import { useState } from 'react';

export default function SlotManager() {
  const [slots, setSlots] = useState([
    { id: 1, jour: 'Lundi', heure: '08:00 - 12:00' },
    { id: 2, jour: 'Mardi', heure: '14:00 - 18:00' },
  ]);
  const [jour, setJour] = useState('');
  const [heure, setHeure] = useState('');

  const ajouterCreneau = () => {
    const nouveau = {
      id: Date.now(),
      jour,
      heure,
    };
    setSlots([...slots, nouveau]);
    setJour('');
    setHeure('');
  };

  const supprimerCreneau = (id) => {
    setSlots(slots.filter((slot) => slot.id !== id));
  };

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
        <button onClick={ajouterCreneau} className="bg-blue-600 text-white px-4 py-2 rounded">
          Ajouter
        </button>
      </div>

      <h4 className="text-xl font-semibold mb-2">Créneaux existants</h4>
      <ul className="space-y-2">
        {slots.map((slot) => (
          <li key={slot.id} className="flex justify-between items-center border p-2 rounded">
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
