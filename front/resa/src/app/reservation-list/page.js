"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';

// Données de test pour un utilisateur connecté (Marie Dubois)
const USER_INFO = {
  id: 1,
  name: "Marie Dubois",
  email: "marie.dubois@email.com",
  phone: "+33 6 12 34 56 78"
};

const MOCK_RESERVATIONS = [
  {
    id: "RES-2025-001",
    booking_reference: "MB2025001",
    passenger_name: "Marie Dubois",
    passenger_email: "marie.dubois@email.com",
    passenger_phone: "+33 6 12 34 56 78",
    
    // Informations du voyage
    ferry_name: "Titanic",
    ferry_company: "Titanic",
    route: "Portsmouth → Le Havre",
    departure_port: "Portsmouth",
    arrival_port: "Le Havre",
    departure_date: "2025-07-15",
    departure_time: "23:00",
    arrival_date: "2025-07-16",
    arrival_time: "08:30",
    duration: "9h 30min",
    
    // Détails de la réservation
    nb_passengers: 2,
    nb_vehicles: 1,
    vehicle_type: "Voiture (< 6m)",
    cabin_type: "Cabine 2 lits",
    cabin_number: "A-245",
    total_price: 485.50,
    currency: "EUR",
    
    // Statut et dates
    status: "confirmed",
    booking_date: "2025-06-10T14:30:00Z",
    payment_status: "paid"
  },
  {
    id: "RES-2025-002",
    booking_reference: "MB2025002",
    passenger_name: "Marie Dubois",
    passenger_email: "marie.dubois@email.com",
    passenger_phone: "+33 6 12 34 56 78",
    
    ferry_name: "Destination Valhalha",
    ferry_company: "Destination Valhalha",
    route: "Calais → Douvres",
    departure_port: "Calais",
    arrival_port: "Douvres",
    departure_date: "2025-08-22",
    departure_time: "14:30",
    arrival_date: "2025-08-22",
    arrival_time: "16:00",
    duration: "1h 30min",
    
    nb_passengers: 4,
    nb_vehicles: 1,
    vehicle_type: "Voiture (< 6m)",
    cabin_type: "Siège inclinable",
    cabin_number: null,
    total_price: 224.00,
    currency: "EUR",
    
    status: "pending",
    booking_date: "2025-06-11T09:15:00Z",
    payment_status: "pending"
  },
  {
    id: "RES-2025-003", 
    booking_reference: "MB2025003",
    passenger_name: "Marie Dubois",
    passenger_email: "marie.dubois@email.com",
    passenger_phone: "+33 6 12 34 56 78",
    
    ferry_name: "Destination Finale",
    ferry_company: "Destination Finale",
    route: "Nice → Bastia",
    departure_port: "Nice",
    arrival_port: "Bastia",
    departure_date: "2025-05-28",
    departure_time: "17:30",
    arrival_date: "2025-05-29", 
    arrival_time: "01:30",
    duration: "8h 00min",
    
    nb_passengers: 2,
    nb_vehicles: 0,
    vehicle_type: null,
    cabin_type: "Pont libre",
    cabin_number: null,
    total_price: 156.00,
    currency: "EUR",
    
    status: "completed",
    booking_date: "2025-04-15T16:45:00Z",
    payment_status: "paid"
  },
  {
    id: "RES-2025-004",
    booking_reference: "MB2025004", 
    passenger_name: "Marie Dubois",
    passenger_email: "marie.dubois@email.com",
    passenger_phone: "+33 6 12 34 56 78",
    
    ferry_name: "Black Pearl",
    ferry_company: "Black Pearl",
    route: "Cherbourg → Rosslare",
    departure_port: "Cherbourg",
    arrival_port: "Rosslare",
    departure_date: "2025-09-10",
    departure_time: "16:30",
    arrival_date: "2025-09-11",
    arrival_time: "10:45",
    duration: "18h 15min",
    
    nb_passengers: 3,
    nb_vehicles: 1,
    vehicle_type: "Camping-car (< 8m)",
    cabin_type: "Cabine 4 lits",
    cabin_number: "B-112",
    total_price: 678.75,
    currency: "EUR",
    
    status: "cancelled",
    booking_date: "2025-06-09T11:20:00Z",
    payment_status: "refunded"
  }
];

const useReservationsData = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulation d'un délai réseau
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setReservations([...MOCK_RESERVATIONS]);
    } catch (err) {
      setError('Erreur lors du chargement de vos réservations');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateReservation = useCallback(async (id, reservationData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedReservation = {
        ...reservationData,
        id,
        booking_date: reservations.find(r => r.id === id)?.booking_date || new Date().toISOString()
      };
      
      setReservations(prev => prev.map(res => res.id === id ? updatedReservation : res));
      return { success: true, data: updatedReservation };
    } catch (err) {
      return { success: false, error: 'Erreur lors de la modification' };
    }
  }, [reservations]);

  const cancelReservation = useCallback(async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setReservations(prev => prev.map(res => 
        res.id === id 
          ? { ...res, status: 'cancelled', payment_status: 'refund_pending' }
          : res
      ));
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Erreur lors de l\'annulation' };
    }
  }, []);

  return { 
    reservations, 
    loading, 
    error, 
    fetchReservations, 
    updateReservation,
    cancelReservation,
    refetch: fetchReservations
  };
};

export default function MyReservations() {
  const { 
    reservations, 
    loading, 
    error, 
    fetchReservations, 
    updateReservation,
    cancelReservation,
    refetch 
  } = useReservationsData();

  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('departure_date');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  // Filtrage et tri des réservations
  const filteredAndSortedReservations = useMemo(() => {
    let filtered = reservations.filter(reservation => {
      const matchesSearch = 
        reservation.ferry_name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
        reservation.route?.toLowerCase().includes(searchFilter.toLowerCase()) ||
        reservation.booking_reference?.toLowerCase().includes(searchFilter.toLowerCase()) ||
        reservation.departure_port?.toLowerCase().includes(searchFilter.toLowerCase()) ||
        reservation.arrival_port?.toLowerCase().includes(searchFilter.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'ferry_name':
          return (a.ferry_name || '').localeCompare(b.ferry_name || '');
        case 'total_price':
          return a.total_price - b.total_price;
        case 'status':
          return (a.status || '').localeCompare(b.status || '');
        case 'departure_date':
        default:
          return new Date(a.departure_date + ' ' + a.departure_time).getTime() - 
                 new Date(b.departure_date + ' ' + b.departure_time).getTime();
      }
    });
  }, [reservations, searchFilter, sortBy, statusFilter]);

  // Fonctions utilitaires
  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric'
      });
    } catch {
      return 'Date invalide';
    }
  };

  const formatTime = (time) => {
    return time || 'N/A';
  };

  const formatPrice = (price, currency = 'EUR') => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', label: 'En attente', icon: '⏳' },
      confirmed: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'Confirmée', icon: '✅' },
      cancelled: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', label: 'Annulée', icon: '❌' },
      completed: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', label: 'Voyage effectué', icon: '🎯' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
        <span className="text-xs">{config.icon}</span>
        {config.label}
      </span>
    );
  };

  const getPaymentBadge = (paymentStatus) => {
    const statusConfig = {
      paid: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'Payé', icon: '💳' },
      pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', label: 'En attente', icon: '⏱️' },
      refunded: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', label: 'Remboursé', icon: '💰' },
      refund_pending: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30', label: 'Remb. en cours', icon: '🔄' }
    };
    
    const config = statusConfig[paymentStatus] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
        <span className="text-xs">{config.icon}</span>
        {config.label}
      </span>
    );
  };

  // Gestion des modales
  const openModal = (mode, reservation = null) => {
    setModalMode(mode);
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMode('view');
    setSelectedReservation(null);
  };

  // Affichage de notifications
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleCancel = async () => {
    try {
      const result = await cancelReservation(selectedReservation.id);
      
      if (result.success) {
        showNotification('Réservation annulée avec succès. Le remboursement sera traité sous 5-7 jours ouvrés.');
        closeModal();
      } else {
        showNotification(result.error, 'error');
      }
    } catch (err) {
      showNotification('Erreur lors de l\'annulation', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sky-950/70 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
          <p className="text-gray-300 text-lg">Chargement de vos réservations...</p>
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
        <div className="container mx-auto px-4 max-w-7xl">
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

          {/* En-tête utilisateur */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {USER_INFO.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Mes Réservations Ferry
                </h1>
                <p className="text-gray-400">
                  Bonjour {USER_INFO.name} • {filteredAndSortedReservations.length} réservation{filteredAndSortedReservations.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Barre de filtres */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                {/* Recherche */}
                <div className="relative flex-1 max-w-md">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <input
                    type="text"
                    placeholder="Rechercher par ferry, destination, référence..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-sky-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Filtre par statut */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 bg-sky-950/70 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmées</option>
                  <option value="completed">Voyages effectués</option>
                  <option value="cancelled">Annulées</option>
                </select>

                {/* Tri */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-sky-950/70 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="departure_date">Date de départ</option>
                  <option value="ferry_name">Nom du ferry</option>
                  <option value="total_price">Prix</option>
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
          </div>

          {/* Liste des réservations */}
          {filteredAndSortedReservations.length === 0 ? (
            <div className="bg-sky-900 rounded-lg p-8 text-center">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                {searchFilter || statusFilter !== 'all' ? 'Aucune réservation trouvée' : 'Aucune réservation'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchFilter || statusFilter !== 'all'
                  ? 'Aucune réservation ne correspond à vos critères de recherche'
                  : 'Vous n\'avez pas encore effectué de réservation de ferry'
                }
              </p>
              {(searchFilter || statusFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchFilter('');
                    setStatusFilter('all');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredAndSortedReservations.map((reservation, index) => (
                <div 
                  key={reservation.id}
                  className="bg-sky-900 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200 overflow-hidden"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideIn 0.3s ease-out forwards'
                  }}
                >
                  {/* En-tête de la carte */}
                  <div className="bg-sky-700/50 px-6 py-4 border-b border-gray-700">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🚢</span>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{reservation.ferry_name}</h3>
                            <p className="text-sm text-gray-400">{reservation.ferry_company}</p>
                          </div>
                        </div>
                        <div className="hidden lg:block text-gray-500">•</div>
                        <div className="text-sm text-gray-300">
                          Réf: <span className="font-mono font-medium">{reservation.booking_reference}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(reservation.status)}
                        {getPaymentBadge(reservation.payment_status)}
                      </div>
                    </div>
                  </div>

                  {/* Contenu principal */}
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Itinéraire */}
                      <div className="space-y-3">
                        <h4 className="text-white font-semibold flex items-center gap-2">
                          <span className="text-blue-400">🗺️</span>
                          Itinéraire
                        </h4>
                        <div className="bg-sky-700/30 rounded-lg p-4">
                          <div className="flex items-center justify-between text-sm">
                            <div className="text-center">
                              <div className="text-white font-medium">{reservation.departure_port}</div>
                              <div className="text-gray-400">Départ</div>
                              <div className="text-blue-400 font-mono text-xs mt-1">
                                {formatDate(reservation.departure_date)}
                              </div>
                              <div className="text-blue-400 font-mono text-sm font-semibold">
                                {formatTime(reservation.departure_time)}
                              </div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="text-gray-400 text-xs mb-1">Durée</div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <div className="w-8 h-0.5 bg-blue-400"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              </div>
                              <div className="text-white text-xs font-medium mt-1">{reservation.duration}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-white font-medium">{reservation.arrival_port}</div>
                              <div className="text-gray-400">Arrivée</div>
                              <div className="text-green-400 font-mono text-xs mt-1">
                                {formatDate(reservation.arrival_date)}
                              </div>
                              <div className="text-green-400 font-mono text-sm font-semibold">
                                {formatTime(reservation.arrival_time)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Détails de la réservation */}
                      <div className="space-y-3">
                        <h4 className="text-white font-semibold flex items-center gap-2">
                          <span className="text-purple-400">👥</span>
                          Réservation
                        </h4>
                        <div className="bg-sky-700/30 rounded-lg p-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Passagers:</span>
                            <span className="text-white font-medium">{reservation.nb_passengers}</span>
                          </div>
                          {reservation.nb_vehicles > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Véhicule:</span>
                              <span className="text-white font-medium">{reservation.vehicle_type}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Hébergement:</span>
                            <span className="text-white font-medium">{reservation.cabin_type}</span>
                          </div>
                          {reservation.cabin_number && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Cabine:</span>
                              <span className="text-white font-medium">{reservation.cabin_number}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Prix et actions */}
                      <div className="space-y-3">
                        <h4 className="text-white font-semibold flex items-center gap-2">
                          <span className="text-green-400">💰</span>
                          Prix & Actions
                        </h4>
                        <div className="bg-sky-700/30 rounded-lg p-4">
                          <div className="text-center mb-4">
                            <div className="text-2xl font-bold text-white">
                              {formatPrice(reservation.total_price, reservation.currency)}
                            </div>
                            <div className="text-sm text-gray-400">Prix total</div>
                          </div>
                          <div className="space-y-2">
                            <button
                              onClick={() => openModal('view', reservation)}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                            >
                              Voir les détails
                            </button>
                            {reservation.status === 'confirmed' && (
                              <button
                                onClick={() => openModal('cancel', reservation)}
                                className="w-full bg-red-600/80 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                              >
                                Annuler
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal */}
          {showModal && selectedReservation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
              <div className="bg-sky-900 rounded-2xl p-8 max-w-2xl w-full mx-4 border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
                
                {/* Mode Affichage détaillé */}
                {modalMode === 'view' && (
                  <>
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="text-3xl">🚢</span>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{selectedReservation.ferry_name}</h3>
                          <p className="text-gray-400">{selectedReservation.ferry_company}</p>
                        </div>
                      </div>
                      <p className="text-gray-400">Référence: {selectedReservation.booking_reference}</p>
                    </div>

                    <div className="space-y-6">
                      {/* Itinéraire détaillé */}
                      <div className="bg-sky-700 rounded-lg p-5">
                        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                          <span className="text-blue-400">🗺️</span>
                          Itinéraire complet
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                            <div className="text-blue-400 text-sm font-medium mb-2">DÉPART</div>
                            <div className="text-white text-lg font-semibold">{selectedReservation.departure_port}</div>
                            <div className="text-gray-300 text-sm mt-1">
                              {formatDate(selectedReservation.departure_date)} à {formatTime(selectedReservation.departure_time)}
                            </div>
                          </div>
                          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                            <div className="text-green-400 text-sm font-medium mb-2">ARRIVÉE</div>
                            <div className="text-white text-lg font-semibold">{selectedReservation.arrival_port}</div>
                            <div className="text-gray-300 text-sm mt-1">
                              {formatDate(selectedReservation.arrival_date)} à {formatTime(selectedReservation.arrival_time)}
                            </div>
                          </div>
                        </div>
                        <div className="text-center mt-4">
                          <div className="text-gray-400 text-sm">Durée du voyage</div>
                          <div className="text-white font-semibold">{selectedReservation.duration}</div>
                        </div>
                      </div>

                      {/* Détails de la réservation */}
                      <div className="bg-sky-700 rounded-lg p-5">
                        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                          <span className="text-purple-400">🎫</span>
                          Détails de la réservation
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Passagers:</span>
                            <span className="text-white font-medium">{selectedReservation.nb_passengers}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Véhicules:</span>
                            <span className="text-white font-medium">{selectedReservation.nb_vehicles || 0}</span>
                          </div>
                          {selectedReservation.vehicle_type && (
                            <div className="flex justify-between col-span-2">
                              <span className="text-gray-400">Type véhicule:</span>
                              <span className="text-white font-medium">{selectedReservation.vehicle_type}</span>
                            </div>
                          )}
                          <div className="flex justify-between col-span-2">
                            <span className="text-gray-400">Hébergement:</span>
                            <span className="text-white font-medium">{selectedReservation.cabin_type}</span>
                          </div>
                          {selectedReservation.cabin_number && (
                            <div className="flex justify-between col-span-2">
                              <span className="text-gray-400">Numéro de cabine:</span>
                              <span className="text-white font-medium">{selectedReservation.cabin_number}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Informations de paiement */}
                      <div className="bg-sky-700 rounded-lg p-5">
                        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                          <span className="text-green-400">💳</span>
                          Paiement
                        </h4>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-2xl font-bold text-white">
                              {formatPrice(selectedReservation.total_price, selectedReservation.currency)}
                            </div>
                            <div className="text-sm text-gray-400">
                              Réservé le {new Date(selectedReservation.booking_date).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                          {getPaymentBadge(selectedReservation.payment_status)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={closeModal}
                        className="w-full bg-sky-700 hover:bg-sky-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                      >
                        Fermer
                      </button>
                    </div>
                  </>
                )}

                {/* Mode Annulation */}
                {modalMode === 'cancel' && (
                  <>
                    <div className="text-center mb-6">
                      <div className="bg-red-100 rounded-full p-3 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Annuler la Réservation</h3>
                      <p className="text-gray-400">Ferry {selectedReservation.ferry_name}</p>
                    </div>

                    <div className="bg-sky-700 rounded-lg p-4 mb-6 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Référence:</span>
                        <span className="text-white font-mono">{selectedReservation.booking_reference}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Trajet:</span>
                        <span className="text-white">{selectedReservation.route}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Date:</span>
                        <span className="text-white">{formatDate(selectedReservation.departure_date)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Montant:</span>
                        <span className="text-white font-semibold">{formatPrice(selectedReservation.total_price)}</span>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <span className="text-yellow-400 text-xl">⚠️</span>
                        <div className="text-sm">
                          <div className="text-yellow-400 font-medium mb-1">Conditions d'annulation</div>
                          <div className="text-gray-300">
                            Le remboursement sera traité sous 5-7 jours ouvrés. Des frais d'annulation peuvent s'appliquer selon les conditions tarifaires.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={closeModal}
                        className="flex-1 bg-sky-700 hover:bg-sky-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                      >
                        Garder ma réservation
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                      >
                        Confirmer l'annulation
                      </button>
                    </div>
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