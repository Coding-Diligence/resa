class AuthService {
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    console.log('🔗 API Base URL:', this.baseUrl); // Debug
  }

  async register(data) {
    console.log('📝 Tentative d\'inscription avec:', data);
    console.log('🌐 URL complète:', `${this.baseUrl}/api/auth/register`);
    
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('📡 Réponse reçue:', response.status, response.statusText);

      if (response.ok) {
        const user = await response.json();
        console.log('✅ Inscription réussie:', user);
        return { success: true, user };
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Erreur de format de réponse' }));
        console.log('❌ Erreur d\'inscription:', errorData);
        return { success: false, error: errorData.message || 'Erreur lors de l\'inscription' };
      }
    } catch (error) {
      console.error('🚨 Erreur de connexion:', error);
      
      // Messages d'erreur plus spécifiques
      if (error.message === 'Failed to fetch') {
        return { 
          success: false, 
          error: `Impossible de se connecter au serveur backend (${this.baseUrl}). Vérifiez que votre API Java est démarrée.` 
        };
      }
      
      return { success: false, error: 'Erreur de connexion au serveur' };
    }
  }

  async login(credentials) {
    console.log('🔐 Tentative de connexion avec:', { email: credentials.email });
    console.log('🌐 URL complète:', `${this.baseUrl}/api/auth/login`);
    
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log('📡 Réponse reçue:', response.status, response.statusText);

      if (response.ok) {
        const user = await response.json();
        console.log('✅ Connexion réussie:', user);
        // Stocker les informations utilisateur
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('isAuthenticated', 'true');
        return { success: true, user };
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Erreur de format de réponse' }));
        console.log('❌ Erreur de connexion:', errorData);
        return { success: false, error: errorData.message || 'Email ou mot de passe incorrect' };
      }
    } catch (error) {
      console.error('🚨 Erreur de connexion:', error);
      
      if (error.message === 'Failed to fetch') {
        return { 
          success: false, 
          error: `Impossible de se connecter au serveur backend (${this.baseUrl}). Vérifiez que votre API Java est démarrée.` 
        };
      }
      
      return { success: false, error: 'Erreur de connexion au serveur' };
    }
  }

  async getCurrentUser() {
    console.log('👤 Vérification de l\'utilisateur actuel');
    console.log('🌐 URL complète:', `${this.baseUrl}/api/auth/me`);
    
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Pour inclure les cookies de session
      });

      console.log('📡 Réponse reçue:', response.status, response.statusText);

      if (response.ok) {
        const user = await response.json();
        console.log('✅ Utilisateur trouvé:', user);
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('isAuthenticated', 'true');
        return { success: true, user };
      } else {
        console.log('❌ Session expirée ou invalide');
        this.logout();
        return { success: false, error: 'Session expirée' };
      }
    } catch (error) {
      console.error('🚨 Erreur getCurrentUser:', error);
      
      if (error.message === 'Failed to fetch') {
        return { 
          success: false, 
          error: `Impossible de se connecter au serveur backend (${this.baseUrl})` 
        };
      }
      
      return { success: false, error: 'Erreur de connexion au serveur' };
    }
  }

  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('isAuthenticated') === 'true';
  }

  getCurrentUserData() {
    if (typeof window === 'undefined') return null;
    const userData = sessionStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  logout() {
    if (typeof window === 'undefined') return;
    console.log('🚪 Déconnexion');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('isAuthenticated');
    localStorage.removeItem('register_name');
    localStorage.removeItem('register_email');
    localStorage.removeItem('register_expiry');
  }

  // Méthode de test pour vérifier la connectivité
  async testConnection() {
    console.log('🧪 Test de connexion à l\'API...');
    try {
      const response = await fetch(`${this.baseUrl}/api/health`, {
        method: 'GET',
      });
      console.log('📡 Statut du test:', response.status);
      return response.ok;
    } catch (error) {
      console.error('🚨 Échec du test de connexion:', error);
      return false;
    }
  }
}

export const authService = new AuthService();