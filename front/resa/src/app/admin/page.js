'use client';

import { useState } from 'react';
import FerryOffersManager from '../components/admin/FerryOffersManager';
import UserManager from '../components/admin/UsersManager';
import SlotManager from '../components/admin/SlotManager';
import ReservationDashboardComponent from '../components/admin/ReservationDashboard';

const tabs = [
  {
    id: 'ferries',
    label: 'Offres de ferry',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="#ffffff" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 17.5L3 12L12 9L21 12L20 17.5M5 11.3333V7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V11.3333M10 5V3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5M2 21C3 22 6 22 8 20C10 22 14 22 16 20C18 22 21 22 22 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'users',
    label: 'Utilisateurs',
    icon: (
      <svg className='h-6 w-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.6311 7.15517C15.9018 7.05482 16.1945 7 16.5001 7C17.8808 7 19.0001 8.11929 19.0001 9.5C19.0001 10.8807 17.8808 12 16.5001 12C16.1945 12 15.9018 11.9452 15.6311 11.8448" stroke="#ffffff" stroke-width="2" stroke-linecap="round"></path> <path d="M3 19C3.69137 16.6928 5.46998 16 9.5 16C13.53 16 15.3086 16.6928 16 19" stroke="#ffffff" stroke-width="2" stroke-linecap="round"></path> <path d="M17 15C19.403 15.095 20.5292 15.6383 21 17" stroke="#ffffff" stroke-width="2" stroke-linecap="round"></path> <path d="M13 9.5C13 11.433 11.433 13 9.5 13C7.567 13 6 11.433 6 9.5C6 7.567 7.567 6 9.5 6C11.433 6 13 7.567 13 9.5Z" stroke="#ffffff" stroke-width="2"></path> </g></svg>
    )
  },
  {
    id: 'slots',
    label: 'Créneaux',
    icon: (
      <svg className='w-6 h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=stroke"> <g id="chronometer"> <path id="line (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M18.4697 7.53033C18.1768 7.23744 18.1768 6.76256 18.4697 6.46967L19.9697 4.96967C20.2626 4.67678 20.7374 4.67678 21.0303 4.96967C21.3232 5.26256 21.3232 5.73744 21.0303 6.03033L19.5303 7.53033C19.2374 7.82322 18.7626 7.82322 18.4697 7.53033Z" fill="#ffffff"></path> <path id="line (Stroke)_2" fill-rule="evenodd" clip-rule="evenodd" d="M22.5303 6.53033C22.2374 6.82322 21.7626 6.82322 21.4697 6.53033L19.4697 4.53033C19.1768 4.23744 19.1768 3.76256 19.4697 3.46967C19.7626 3.17678 20.2374 3.17678 20.5303 3.46967L22.5303 5.46967C22.8232 5.76256 22.8232 6.23744 22.5303 6.53033Z" fill="#ffffff"></path> <path id="vector (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M12 5C7.44621 5 3.75 8.69621 3.75 13.25C3.75 17.8038 7.44621 21.5 12 21.5C16.5538 21.5 20.25 17.8038 20.25 13.25C20.25 8.69621 16.5538 5 12 5ZM2.25 13.25C2.25 7.86779 6.61779 3.5 12 3.5C17.3822 3.5 21.75 7.86779 21.75 13.25C21.75 18.6322 17.3822 23 12 23C6.61779 23 2.25 18.6322 2.25 13.25Z" fill="#ffffff"></path> <path id="line (Stroke)_3" fill-rule="evenodd" clip-rule="evenodd" d="M8.25 1.75C8.25 2.16421 8.58579 2.5 9 2.5L15 2.5C15.4142 2.5 15.75 2.16421 15.75 1.75C15.75 1.33579 15.4142 0.999999 15 0.999999L9 1C8.58579 1 8.25 1.33579 8.25 1.75Z" fill="#ffffff"></path> <path id="Vector (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M12 7.5C12.4142 7.5 12.75 7.83579 12.75 8.25V13.25C12.75 13.6642 12.4142 14 12 14C11.5858 14 11.25 13.6642 11.25 13.25V8.25C11.25 7.83579 11.5858 7.5 12 7.5Z" fill="#ffffff"></path> </g> </g> </g></svg>
    )
  },
  {
    id: 'reservations',
    label: 'Réservations',
    icon: (
      <svg className='w-6 h-6' viewBox="-0.5 0 15 15" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" fill-rule="evenodd" d="M107,154.006845 C107,153.45078 107.449949,153 108.006845,153 L119.993155,153 C120.54922,153 121,153.449949 121,154.006845 L121,165.993155 C121,166.54922 120.550051,167 119.993155,167 L108.006845,167 C107.45078,167 107,166.550051 107,165.993155 L107,154.006845 Z M108,157 L120,157 L120,166 L108,166 L108,157 Z M116.5,163.5 L116.5,159.5 L115.757485,159.5 L114.5,160.765367 L114.98503,161.275112 L115.649701,160.597451 L115.649701,163.5 L116.5,163.5 Z M112.5,163.5 C113.412548,163.5 114,163.029753 114,162.362119 C114,161.781567 113.498099,161.473875 113.110266,161.433237 C113.532319,161.357765 113.942966,161.038462 113.942966,160.550798 C113.942966,159.906386 113.395437,159.5 112.505703,159.5 C111.838403,159.5 111.359316,159.761248 111.051331,160.115385 L111.456274,160.632075 C111.724335,160.370827 112.055133,160.231495 112.425856,160.231495 C112.819392,160.231495 113.13308,160.382438 113.13308,160.690131 C113.13308,160.974601 112.847909,161.102322 112.425856,161.102322 C112.28327,161.102322 112.020913,161.102322 111.952471,161.096517 L111.952471,161.839623 C112.009506,161.833817 112.26616,161.828012 112.425856,161.828012 C112.956274,161.828012 113.190114,161.967344 113.190114,162.275036 C113.190114,162.565312 112.93346,162.768505 112.471483,162.768505 C112.10076,162.768505 111.684411,162.605951 111.427757,162.327286 L111,162.87881 C111.279468,163.227141 111.804183,163.5 112.5,163.5 Z M110,152.5 C110,152.223858 110.214035,152 110.504684,152 L111.495316,152 C111.774045,152 112,152.231934 112,152.5 L112,153 L110,153 L110,152.5 Z M116,152.5 C116,152.223858 116.214035,152 116.504684,152 L117.495316,152 C117.774045,152 118,152.231934 118,152.5 L118,153 L116,153 L116,152.5 Z" transform="translate(-107 -152)"></path> </g></svg>
    )
  }
];

function SidebarItem({ id, label, icon, activeTab, setActiveTab }) {
  const isActive = activeTab === id;
  return (
    <li
      className={`py-3 px-8 flex justify-between items-center cursor-pointer transition-colors ${
        isActive ? 'bg-sky-950' : 'hover:bg-sky-900'
      }`}
      onClick={() => setActiveTab(id)}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-lg font-medium">{label}</span>
      </div>
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#ffffff" xmlns="http://www.w3.org/2000/svg">
        <polyline points="8 5 16 12 8 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </li>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('ferries');

  return (
    <div className="flex w-full min-h-[calc(100vh-96px)]">
      <aside className="w-3/12 bg-sky-950/70 backdrop-blur-sm shadow-xl/30 text-white py-6 overflow-y-auto mr-2">
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <SidebarItem
              key={tab.id}
              id={tab.id}
              label={tab.label}
              icon={tab.icon}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </ul>
      </aside>

      <main className="w-9/12 p-8 relative bg-sky-950/70 shadow-xl/30 overflow-y-auto">
        {activeTab === 'ferries' && (
          <section>
            <h3 className="text-2xl font-semibold mb-4">Offres de ferry</h3>
            <FerryOffersManager />
          </section>
        )}
        {activeTab === 'users' && (
          <section>
            <h3 className="text-2xl font-semibold mb-4">Utilisateurs</h3>
            <UserManager />
          </section>
        )}
        {activeTab === 'slots' && (
          <section>
            <h3 className="text-2xl font-semibold mb-4">Créneaux disponibles</h3>
            <SlotManager />
          </section>
        )}
        {activeTab === 'reservations' && (
          <section>
            <h3 className="text-2xl font-semibold mb-4">Réservations</h3>
            <ReservationDashboardComponent />
          </section>
        )}
      </main>
    </div>
  );
}
