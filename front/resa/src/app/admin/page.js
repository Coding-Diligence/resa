'use client';

import { useState } from 'react';
import FerryOffersManager from '../components/admin/FerryOffersManager';
import UserManager from '../components/admin/UsersManager';


export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('ferries'); // 'users', 'slots', 'reservations'

  return (
    <div className="grid grid-cols-2 min-h-screen bg-gray-100">
      {/* --- Sidebar navigation --- */}
      <div className="bg-sky-950 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <button onClick={() => setActiveTab('ferries')} className="hover:underline">
              🚢 Offres de ferry
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('users')} className="hover:underline">
              👥 Utilisateurs
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('slots')} className="hover:underline">
              ⏱️ Créneaux
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('reservations')} className="hover:underline">
              📅 Réservations
            </button>
          </li>
        </ul>
      </div>

      {/* --- Content area --- */}
      <div className="p-8 overflow-y-auto">
        {activeTab === 'ferries' && <FerryDashboard />}
        {activeTab === 'users' && <UserDashboard />}
        {activeTab === 'slots' && <SlotDashboard />}
        {activeTab === 'reservations' && <ReservationDashboard />}
      </div>
    </div>
  );
}

function FerryDashboard() {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Offres de ferry</h3>
      <FerryOffersManager />
    </div>
  );
}

function UserDashboard() {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Utilisateurs</h3>
      <UserManager />
    </div>
  );
}

function SlotDashboard() {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Créneaux disponibles</h3>
      <p>(Plages horaires, jours ouvrés, planning)</p>
    </div>
  );
}

function ReservationDashboard() {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Réservations</h3>
      <p>(Tableau + export CSV/PDF)</p>
    </div>
  );
}
