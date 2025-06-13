"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';

const useReservationsData = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(0);

  const fetchReservations = useCallback(async (forceRefresh = false) => {
    const cacheExpiry = 5 * 60 * 1000; 
    const now = Date.now();
    
    if (!forceRefresh && reservations.length > 0 && (now - lastFetch) < cacheExpiry) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch('http://localhost:8080/api/travels', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Format de données invalide: attendu un tableau');
      }

      setReservations(data);
      setLastFetch(now);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Délai d\'attente dépassé. Vérifiez votre connexion internet.');
      } else {
        const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
        setError(`Impossible de charger les réservations: ${errorMessage}`);
      }
      console.error('Erreur lors du fetch:', err);
    } finally {
      setLoading(false);
    }
  }, [reservations.length, lastFetch]);

  const createReservation = useCallback(async (reservationData) => {
    try {
      const response = await fetch('http://localhost:8080/api/travels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la création: ${response.status}`);
      }

      const newReservation = await response.json();
      setReservations(prev => [newReservation, ...prev]);
      return { success: true, data: newReservation };
    } catch (err) {
      console.error('Erreur création:', err);
      return { success: false, error: err.message };
    }
  }, []);

  const updateReservation = useCallback(async (id, reservationData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/travels/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la modification: ${response.status}`);
      }

      const updatedReservation = await response.json();
      setReservations(prev => prev.map(res => res.id === id ? updatedReservation : res));
      return { success: true, data: updatedReservation };
    } catch (err) {
      console.error('Erreur modification:', err);
      return { success: false, error: err.message };
    }
  }, []);

  const deleteReservation = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/travels/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la suppression: ${response.status}`);
      }

      setReservations(prev => prev.filter(res => res.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Erreur suppression:', err);
      return { success: false, error: err.message };
    }
  }, []);

  return { 
    reservations, 
    loading, 
    error, 
    fetchReservations, 
    createReservation,
    updateReservation,
    deleteReservation,
    refetch: () => fetchReservations(true) 
  };
};

export default function ReservationList() {
  const { 
    reservations, 
    loading, 
    error, 
    fetchReservations, 
    updateReservation,
    deleteReservation,
    refetch 
  } = useReservationsData();

  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'edit', 'view', 'delete'
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [notification, setNotification] = useState(null);
  
  // État du formulaire
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    travel_id: '',
    nb_passengers: 1,
    nb_vehicles: 0,
    total_price: 0,
    status: 'pending'
  });

  useEffect(() => {
    fetchReservations();
  }, []); // Uniquement au montage du composant

  // Filtrage et tri des réservations
  const filteredAndSortedReservations = useMemo(() => {
    let filtered = reservations.filter(reservation => 
      reservation.customer_name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      reservation.customer_email?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      reservation.status?.toLowerCase().includes(searchFilter.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'customer_name':
          return (a.customer_name || '').localeCompare(b.customer_name || '');
        case 'total_price':
          return a.total_price - b.total_price;
        case 'status':
          return (a.status || '').localeCompare(b.status || '');
        case 'created_at':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
  }, [reservations, searchFilter, sortBy]);

  // Fonctions utilitaires
  const formatDateTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Date invalide';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', label: 'En attente' },
      confirmed: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'Confirmée' },
      cancelled: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', label: 'Annulée' },
      completed: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', label: 'Terminée' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
        {config.label}
      </span>
    );
  };

  // Gestion des modales
  const openModal = (mode, reservation = null) => {
    setModalMode(mode);
    setSelectedReservation(reservation);
    
    if (mode === 'edit' && reservation) {
      setFormData({
        customer_name: reservation.customer_name || '',
        customer_email: reservation.customer_email || '',
        customer_phone: reservation.customer_phone || '',
        travel_id: reservation.travel_id || '',
        nb_passengers: reservation.nb_passengers || 1,
        nb_vehicles: reservation.nb_vehicles || 0,
        total_price: reservation.total_price || 0,
        status: reservation.status || 'pending'
      });
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMode('view');
    setSelectedReservation(null);
    setFormData({
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      travel_id: '',
      nb_passengers: 1,
      nb_vehicles: 0,
      total_price: 0,
      status: 'pending'
    });
  };

  // Affichage de notifications
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Gestion du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await updateReservation(selectedReservation.id, formData);

      if (result.success) {
        showNotification('Réservation modifiée avec succès');
        closeModal();
      } else {
        showNotification(result.error, 'error');
      }
    } catch (err) {
      showNotification('Une erreur est survenue', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteReservation(selectedReservation.id);
      
      if (result.success) {
        showNotification('Réservation supprimée avec succès');
        closeModal();
      } else {
        showNotification(result.error, 'error');
      }
    } catch (err) {
      showNotification('Erreur lors de la suppression', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sky-950/70 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
          <p className="text-gray-300 text-lg">Chargement des réservations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-sky-950/70 flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex items-center space-x-3 mb-4">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-red-400 font-semibold">Erreur de chargement</h3>
          </div>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={refetch}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>

      <div className="min-h-screen bg-sky-950/70 py-8">
        <div className="container mx-auto px-4">
          {/* Notification */}
          {notification && (
            <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border animate-slideIn ${
              notification.type === 'error' 
                ? 'bg-red-900/20 border-red-500 text-red-400' 
                : 'bg-green-900/20 border-green-500 text-green-400'
            }`}>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d={notification.type === 'error' ? "M6 18L18 6M6 6l12 12" : "M5 13l4 4L19 7"}></path>
                </svg>
                <span>{notification.message}</span>
              </div>
            </div>
          )}

          {/* En-tête */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Liste des Réservations
            </h1>
            <p className="text-gray-400">
              Consultez et gérez les réservations - {filteredAndSortedReservations.length} réservation{filteredAndSortedReservations.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Barre d'actions */}
          <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Recherche */}
              <div className="relative flex-1 max-w-md">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher par nom, email ou statut..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-sky-950 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-transparent"
                />
              </div>

              {/* Tri */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-sky-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="created_at">Date de création</option>
                <option value="customer_name">Nom client</option>
                <option value="total_price">Prix total</option>
                <option value="status">Statut</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={refetch}
                className="flex items-center space-x-2 px-4 py-3 bg-sky-950/70 hover:bg-sky-950/60 text-gray-300 hover:text-white rounded-lg transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span>Actualiser</span>
              </button>
            </div>
          </div>

          {/* Liste des réservations */}
          {filteredAndSortedReservations.length === 0 ? (
            <div className="bg-sky-950 rounded-lg p-8 text-center">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                {searchFilter ? 'Aucune réservation trouvée' : 'Aucune réservation'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchFilter 
                  ? `Aucune réservation ne correspond à "${searchFilter}"`
                  : 'Il n\'y a actuellement aucune réservation disponible'
                }
              </p>
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="bg-sky-800 hover:bg-sky-900 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Effacer la recherche
                </button>
              )}
            </div>
          ) : (
            <div className="bg-sky-950-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-sky-950-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Voyage</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Détails</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Prix</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredAndSortedReservations.map((reservation, index) => (
                      <tr 
                        key={reservation.id} 
                        className="hover:bg-sky-950-700/50 transition-colors duration-200"
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animation: 'slideIn 0.3s ease-out forwards'
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-white">{reservation.customer_name || 'N/A'}</div>
                            <div className="text-sm text-gray-400">ID: {reservation.id}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{reservation.customer_email || 'N/A'}</div>
                          <div className="text-sm text-gray-400">{reservation.customer_phone || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">Voyage #{reservation.travel_id || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{reservation.nb_passengers || 0} passager{(reservation.nb_passengers || 0) > 1 ? 's' : ''}</div>
                          <div className="text-sm text-gray-400">{reservation.nb_vehicles || 0} véhicule{(reservation.nb_vehicles || 0) > 1 ? 's' : ''}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-white">{formatPrice(reservation.total_price || 0)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(reservation.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {formatDateTime(reservation.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => openModal('view', reservation)}
                              className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/20 rounded-lg transition-all duration-200"
                              title="Voir"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                              </svg>
                            </button>
                            <button
                              onClick={() => openModal('edit', reservation)}
                              className="text-yellow-400 hover:text-yellow-300 p-2 hover:bg-yellow-500/20 rounded-lg transition-all duration-200"
                              title="Modifier"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                              </svg>
                            </button>
                            <button
                              onClick={() => openModal('delete', reservation)}
                              className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                              title="Supprimer"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
              <div className="bg-sky-950-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
                
                {/* Mode Affichage */}
                {modalMode === 'view' && selectedReservation && (
                  <>
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">Détails de la Réservation</h3>
                      <p className="text-gray-400">ID: {selectedReservation.id}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-sky-950-700 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-2">Informations Client</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Nom:</span>
                            <span className="text-white">{selectedReservation.customer_name || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Email:</span>
                            <span className="text-white">{selectedReservation.customer_email || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Téléphone:</span>
                            <span className="text-white">{selectedReservation.customer_phone || 'N/A'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-sky-950-700 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-2">Détails de la Réservation</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Voyage ID:</span>
                            <span className="text-white">{selectedReservation.travel_id || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Passagers:</span>
                            <span className="text-white">{selectedReservation.nb_passengers || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Véhicules:</span>
                            <span className="text-white">{selectedReservation.nb_vehicles || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Prix total:</span>
                            <span className="text-white font-semibold">{formatPrice(selectedReservation.total_price || 0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Statut:</span>
                            <span>{getStatusBadge(selectedReservation.status)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Créée le:</span>
                            <span className="text-white">{formatDateTime(selectedReservation.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={closeModal}
                        className="w-full bg-sky-950-700 hover:bg-sky-950-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                      >
                        Fermer
                      </button>
                    </div>
                  </>
                )}

                {/* Mode Suppression */}
                {modalMode === 'delete' && selectedReservation && (
                  <>
                    <div className="text-center mb-6">
                      <div className="bg-red-100 rounded-full p-3 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Supprimer la Réservation</h3>
                      <p className="text-gray-400">Cette action est irréversible</p>
                    </div>

                    <div className="bg-sky-950-700 rounded-lg p-4 mb-6">
                      <p className="text-white">
                        Êtes-vous sûr de vouloir supprimer la réservation de <strong>{selectedReservation.customer_name}</strong> ?
                      </p>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={closeModal}
                        className="flex-1 bg-sky-950-700 hover:bg-sky-950-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleDelete}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                      >
                        Supprimer
                      </button>
                    </div>
                  </>
                )}

                {/* Mode Édition */}
                {modalMode === 'edit' && (
                  <>
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Modifier la Réservation
                      </h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Informations client */}
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold">Informations Client</h4>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Nom complet *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.customer_name}
                            onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                            className="w-full px-3 py-2 bg-sky-950-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.customer_email}
                            onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                            className="w-full px-3 py-2 bg-sky-950-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            value={formData.customer_phone}
                            onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                            className="w-full px-3 py-2 bg-sky-950-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      {/* Détails de la réservation */}
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold">Détails de la Réservation</h4>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            ID du Voyage *
                          </label>
                          <input
                            type="number"
                            required
                            value={formData.travel_id}
                            onChange={(e) => setFormData({...formData, travel_id: e.target.value})}
                            className="w-full px-3 py-2 bg-sky-950-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Nb Passagers *
                            </label>
                            <input
                              type="number"
                              min="1"
                              required
                              value={formData.nb_passengers}
                              onChange={(e) => setFormData({...formData, nb_passengers: parseInt(e.target.value) || 1})}
                              className="w-full px-3 py-2 bg-sky-950-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Nb Véhicules
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={formData.nb_vehicles}
                              onChange={(e) => setFormData({...formData, nb_vehicles: parseInt(e.target.value) || 0})}
                              className="w-full px-3 py-2 bg-sky-950-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Prix Total (€) *
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            value={formData.total_price}
                            onChange={(e) => setFormData({...formData, total_price: parseFloat(e.target.value) || 0})}
                            className="w-full px-3 py-2 bg-sky-950-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Statut *
                          </label>
                          <select
                            required
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                            className="w-full px-3 py-2 bg-sky-950-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="pending">En attente</option>
                            <option value="confirmed">Confirmée</option>
                            <option value="cancelled">Annulée</option>
                            <option value="completed">Terminée</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="flex-1 bg-sky-950-700 hover:bg-sky-950-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
                        >
                          Modifier
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}