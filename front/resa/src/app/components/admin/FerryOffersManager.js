'use client';

import { useState, useEffect } from 'react';
import { AdminAPI } from '@/app/services/AdminAPI';

export default function FerryDashboard() {
  const [ferries, setFerries] = useState([]);
  const [newFerry, setNewFerry] = useState({ name: '', destination: '', price: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chargement initial des ferries
  useEffect(() => {
    async function fetchFerries() {
      try {
        const data = await AdminAPI.getFerries();
        setFerries(data);
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement des ferries');
      } finally {
        setLoading(false);
      }
    }
    fetchFerries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFerry({ ...newFerry, [name]: value });
  };

  const handleAdd = async () => {
    if (!newFerry.name || !newFerry.destination || !newFerry.price) return;
    try {
      const ferryToAdd = {
        name: newFerry.name,
        destination: newFerry.destination,
        price: parseFloat(newFerry.price),
      };
      const createdFerry = await AdminAPI.createFerry(ferryToAdd);
      setFerries((prev) => [...prev, createdFerry]);
      setNewFerry({ name: '', destination: '', price: '' });
    } catch (err) {
      alert(`Erreur lors de l'ajout : ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Voulez-vous vraiment supprimer ce ferry ?')) return;
    try {
      await AdminAPI.deleteFerry(id);
      setFerries((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      alert(`Erreur lors de la suppression : ${err.message}`);
    }
  };

  if (loading) return <p>Chargement des ferries...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

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
