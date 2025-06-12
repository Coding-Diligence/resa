'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../lib/authService';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Rediriger si déjà connecté
  useEffect(() => {
    if (authService.isAuthenticated()) {
      router.push('/');
    }
  }, [router]);

  // Charger les données sauvegardées si rememberMe était activé
  useEffect(() => {
    const savedEmail = localStorage.getItem('login_email');
    const savedRemember = localStorage.getItem('login_remember') === 'true';
    
    if (savedEmail && savedRemember) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation simple côté client
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      setIsLoading(false);
      return;
    }

    try {
      const result = await authService.login({ email, password });

      if (result.success) {
        // Gérer "Se souvenir de moi"
        if (rememberMe) {
          localStorage.setItem('login_email', email);
          localStorage.setItem('login_remember', 'true');
        } else {
          localStorage.removeItem('login_email');
          localStorage.removeItem('login_remember');
        }

        // Rediriger vers la page d'accueil
        router.push('/');
      } else {
        setError(result.error || 'Erreur de connexion');
      }
    } catch (err) {
      console.error('Erreur lors de la connexion:', err);
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-[1fr_3fr] min-h-screen bg-gray-900">
      {/* Zone 25% avec filtre et texte */}
      <div className="flex items-center justify-center bg-sky-950 bg-opacity-50 text-white p-6">
        <p className="text-lg leading-relaxed">
          Partez à l'aventure en mer avec notre service de réservation maritime. 
          Découvrez des destinations uniques, profitez d'un confort exceptionnel à bord 
          et vivez une expérience inoubliable sur les flots.
        </p>
      </div>

      {/* Zone 75% avec la carte de connexion */}
      <div className="flex flex-col text-sky-950 items-center justify-center p-6">
        <div className="w-full max-w-xl container bg-sky-950/70 text-white shadow-xl rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Connexion</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full p-2 rounded bg-white text-black placeholder:text-gray-500 disabled:opacity-50"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full p-2 rounded bg-white text-black placeholder:text-gray-500 disabled:opacity-50 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center text-sm text-gray-300">
                  <input 
                    type="checkbox" 
                    className="form-checkbox text-sky-600 bg-gray-700 border-gray-600"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="ml-2">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-sm text-sky-300 hover:underline">
                  Mot de passe oublié ?
                </a>
                <a href="/register" className="text-sm text-sky-300 hover:underline">
                  Créer un compte
                </a>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-gradient-to-r from-sky-950 to-sky-800 text-white rounded-md 
                hover:brightness-120 transition duration-300 ease-in-out 
                focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 
                disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}