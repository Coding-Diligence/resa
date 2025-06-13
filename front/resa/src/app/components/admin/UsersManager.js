'use client';

import { useState, useEffect } from 'react';
import { AdminAPI } from '@/app/services/AdminAPI';

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chargement initial des utilisateurs
  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await AdminAPI.getUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement des utilisateurs');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email) return;
    try {
      const createdUser = await AdminAPI.createUser(newUser);
      setUsers((prev) => [...prev, createdUser]);
      setNewUser({ name: '', email: '', role: 'user' });
    } catch (err) {
      alert(`Erreur lors de l'ajout de l'utilisateur : ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;
    try {
      await AdminAPI.deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      alert(`Erreur lors de la suppression : ${err.message}`);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await AdminAPI.changeUserRole(id, role);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, role } : user))
      );
    } catch (err) {
      alert(`Erreur lors du changement de rôle : ${err.message}`);
    }
  };

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">Gestion des utilisateurs</h3>

      <div className="space-y-4">
        <input
          name="name"
          placeholder="Nom"
          value={newUser.name}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
        <input
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        >
          <option value="user">Utilisateur</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handleAddUser}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Ajouter utilisateur
        </button>
      </div>

      <table className="w-full border mt-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nom</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Rôle</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="p-1 border rounded"
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
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
