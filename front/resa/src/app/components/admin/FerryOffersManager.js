'use client';

import { useState } from 'react';

const initialFerries = [
  { id: 1, name: 'Ferry Express', destination: 'Bastia', price: 49.99 },
  { id: 2, name: 'Mer Rapide', destination: 'Ajaccio', price: 59.99 },
];

export default function FerryDashboard() {
  const [ferries, setFerries] = useState(initialFerries);
  const [newFerry, setNewFerry] = useState({ name: '', destination: '', price: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFerry({ ...newFerry, [name]: value });
  };

  const handleAdd = () => {
    if (!newFerry.name || !newFerry.destination || !newFerry.price) return;
    setFerries([...ferries, { ...newFerry, id: Date.now(), price: parseFloat(newFerry.price) }]);
    setNewFerry({ name: '', destination: '', price: '' });
  };

  const handleDelete = (id) => {
    setFerries(ferries.filter((ferry) => ferry.id !== id));
  };

  return (
    <div>
      <div className="mb-6 space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Nom du ferry"
          value={newFerry.name}
          onChange={handleChange}
          className="p-2 rounded border w-full"
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={newFerry.destination}
          onChange={handleChange}
          className="p-2 rounded border w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={newFerry.price}
          onChange={handleChange}
          className="p-2 rounded border w-full"
        />
        <button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Ajouter
        </button>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-2">Nom</th>
            <th className="border p-2">Destination</th>
            <th className="border p-2">Prix</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ferries.map((ferry) => (
            <tr key={ferry.id} className="bg-white">
              <td className="border p-2">{ferry.name}</td>
              <td className="border p-2">{ferry.destination}</td>
              <td className="border p-2">{ferry.price.toFixed(2)}€</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(ferry.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Supprimer 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
