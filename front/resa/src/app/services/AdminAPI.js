const API_BASE_URL = 'http://localhost:1845/api'; 
const getToken = () => localStorage.getItem('token');

const request = async (method, endpoint, data = null) => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Erreur ${res.status} : ${error}`);
  }

  return res.status !== 204 ? res.json() : null;
};

export const AdminAPI = {
  // Auth
  login: (credentials) => request('POST', '/login', credentials),

  // Utilisateurs
  getUsers: () => request('GET', '/users'),
  getUser: (id) => request('GET', `/users/${id}`),
  createUser: (userData) => request('POST', '/users', userData),
  updateUser: (id, userData) => request('PUT', `/users/${id}`, userData),
  deleteUser: (id) => request('DELETE', `/users/${id}`),
  changeUserRole: (id, role) => request('PATCH', `/users/${id}/role`, { role }),

  // Créneaux
  getSlots: () => request('GET', '/slots'),
  createSlot: (slotData) => request('POST', '/slots', slotData),
  updateSlot: (id, slotData) => request('PUT', `/slots/${id}`, slotData),
  deleteSlot: (id) => request('DELETE', `/slots/${id}`),

  // Ressources
  getResources: () => request('GET', '/resources'),
  getResource: (id) => request('GET', `/resources/${id}`),
  createResource: (data) => request('POST', '/resources', data),
  updateResource: (id, data) => request('PUT', `/resources/${id}`, data),
  deleteResource: (id) => request('DELETE', `/resources/${id}`),

  // Réservations
  getBookings: () => request('GET', '/bookings'),
  getBooking: (id) => request('GET', `/bookings/${id}`),
  createBooking: (data) => request('POST', '/bookings', data),
  updateBooking: (id, data) => request('PUT', `/bookings/${id}`, data),
  deleteBooking: (id) => request('DELETE', `/bookings/${id}`),

  // Ferries
  getFerries: () => request('GET', '/ferries'),
  createFerry: (ferryData) => request('POST', '/ferries', ferryData),
  deleteFerry: (id) => request('DELETE', `/ferries/${id}`),

  // Export CSV/PDF
  exportCSV: () => request('GET', '/export/csv'),
  exportPDF: () => request('GET', '/export/pdf'),
};
