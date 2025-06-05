'use client';

import { useState } from 'react';

export default function UserManager() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
  ]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    const id = Date.now();
    setUsers([...users, { ...newUser, id }]);
    setNewUser({ name: '', email: '', role: 'user' });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleRoleChange = (id, role) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, role } : user
      )
    );
  };

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
