'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../lib/authService';

// Composant d'aide pour conflit de port
function PortConflictHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState('');

  const copyCommand = (command) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(''), 2000);
  };

  const commands = [
    {
      step: "1. Identifier le processus",
      command: "netstat -ano | findstr :8080",
      description: "Trouve quel processus utilise le port 8080"
    },
    {
      step: "2. Arrêter le processus", 
      command: "taskkill /F /IM java.exe",
      description: "Arrête tous les processus Java (plus sûr)"
    },
    {
      step: "3. Vérifier que le port est libre",
      command: "netstat -ano | findstr :8080", 
      description: "Doit retourner aucun résultat si le port est libre"
    }
  ];

  return (
    <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-red-200 mb-1">
            🚨 Port 8080 déjà utilisé
          </h3>
          <p className="text-sm text-red-300">
            Votre API Spring Boot ne peut pas démarrer car le port 8080 est occupé
          </p>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold"
        >
          {isOpen ? 'Masquer' : 'Résoudre'}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <div className="bg-red-800/20 p-3 rounded">
            <h4 className="font-semibold text-red-200 mb-2">
              🔧 Solution Windows (PowerShell)
            </h4>
            
            {commands.map((cmd, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div className="text-sm font-medium text-red-200 mb-1">
                  {cmd.step}
                </div>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-gray-900 text-green-300 p-2 rounded text-sm font-mono">
                    {cmd.command}
                  </code>
                  <button
                    onClick={() => copyCommand(cmd.command)}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
                  >
                    {copiedCommand === cmd.command ? '✅' : '📋'}
                  </button>
                </div>
                <div className="text-xs text-red-300 mt-1">
                  {cmd.description}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-800/20 p-3 rounded">
            <h4 className="font-semibold text-green-200 mb-2">
              ✅ Après avoir libéré le port
            </h4>
            <ol className="text-sm text-green-300 space-y-1 list-decimal list-inside">
              <li>Redémarrez votre Spring Boot dans votre IDE</li>
              <li>Vérifiez les logs : "Tomcat started on port(s): 8080"</li>
              <li>Utilisez le scanner ci-dessous pour vérifier</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
function AdvancedConnectionTest() {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const testMultiplePorts = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    const ports = [8080, 8081, 8082, 9090, 3000, 8000];
    const results = [];

    for (const port of ports) {
      try {
        const response = await fetch(`http://localhost:${port}`, {
          method: 'GET',
          signal: AbortSignal.timeout(3000)
        });

        if (response.ok) {
          results.push({
            port,
            status: '✅ ACCESSIBLE',
            details: `Serveur détecté (${response.status})`,
          });
          
          // Test API Spring Boot
          try {
            const apiResponse = await fetch(`http://localhost:${port}/api/auth/me`, {
              signal: AbortSignal.timeout(3000)
            });
            
            if (apiResponse.status === 401 || apiResponse.status === 403 || apiResponse.ok) {
              results[results.length - 1].details += ' - 🌟 API Spring Boot détectée !';
              results[results.length - 1].isSpringBoot = true;
            }
          } catch (e) {
            // Ignore
          }
        }
      } catch (error) {
        results.push({
          port,
          status: '❌ NON ACCESSIBLE',
          details: 'Aucun serveur',
        });
      }
    }

    setTestResults(results);
    setIsLoading(false);
  };

  const updateApiUrl = (port) => {
    const newUrl = `http://localhost:${port}`;
    navigator.clipboard.writeText(`NEXT_PUBLIC_API_URL=${newUrl}`);
    alert(`✅ Copiez cette ligne dans votre .env.local :\n\nNEXT_PUBLIC_API_URL=${newUrl}\n\nPuis redémarrez Next.js !`);
  };

  return (
    <div className="bg-blue-900/50 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-bold mb-2">🔧 Scanner les ports pour trouver votre API</h3>
      <div className="mb-3 text-sm text-blue-200">
        URL configurée: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}
      </div>
      
      <button 
        onClick={testMultiplePorts}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50 font-semibold"
      >
        {isLoading ? '🔍 Scan...' : '🚀 Chercher mon API'}
      </button>

      {testResults.length > 0 && (
        <div className="mt-4 space-y-2">
          {testResults.map((result, index) => (
            <div 
              key={index} 
              className={`p-2 rounded flex justify-between items-center ${
                result.isSpringBoot 
                  ? 'bg-green-900/50 border border-green-500' 
                  : result.status.includes('✅')
                  ? 'bg-yellow-900/30'
                  : 'bg-gray-800/30'
              }`}
            >
              <div>
                <span className="font-mono text-sm">:{result.port}</span>
                <span className="ml-2">{result.status}</span>
                <div className="text-xs text-gray-300">{result.details}</div>
              </div>
              
              {result.isSpringBoot && (
                <button
                  onClick={() => updateApiUrl(result.port)}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
                >
                  Utiliser ce port
                </button>
              )}
            </div>
          ))}
          
          {!testResults.some(r => r.isSpringBoot) && (
            <div className="mt-3 p-3 bg-red-900/30 rounded text-sm">
              ❌ Aucune API Spring Boot détectée. Vérifiez que votre backend est démarré !
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Rediriger si déjà connecté
  useEffect(() => {
    if (authService.isAuthenticated()) {
      router.push('/');
    }
  }, [router]);

  // Charger les données sauvegardées si valides
  useEffect(() => {
    const savedName = localStorage.getItem('register_name');
    const savedEmail = localStorage.getItem('register_email');
    const expiry = localStorage.getItem('register_expiry');

    if (expiry && Date.now() < parseInt(expiry)) {
      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
    } else {
      localStorage.removeItem('register_name');
      localStorage.removeItem('register_email');
      localStorage.removeItem('register_expiry');
    }
  }, []);

  // Sauvegarder dans le localStorage à chaque changement si rememberMe est activé
  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem('register_name', name);
      localStorage.setItem('register_email', email);
      localStorage.setItem('register_expiry', (Date.now() + 10 * 60 * 1000).toString());
    }
  }, [name, email, rememberMe]);

  const validateForm = () => {
    // Validation du nom
    if (!name || name.trim().length < 2) {
      setError('Le nom doit contenir au moins 2 caractères');
      return false;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Veuillez entrer un email valide');
      return false;
    }

    // Validation du mot de passe
    if (!password || password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }

    // Validation de la confirmation du mot de passe
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log('🚀 Démarrage de l\'inscription...');
      const result = await authService.register({
        name: name.trim(),
        email: email.trim(),
        password
      });

      if (result.success) {
        console.log('✅ Inscription réussie, tentative d\'auto-connexion...');
        // Nettoyer les données temporaires
        localStorage.removeItem('register_name');
        localStorage.removeItem('register_email');
        localStorage.removeItem('register_expiry');

        // Auto-connexion après inscription réussie
        const loginResult = await authService.login({ email, password });
        
        if (loginResult.success) {
          // Rediriger vers la page d'accueil
          router.push('/');
        } else {
          // Rediriger vers la page de connexion si l'auto-connexion échoue
          router.push('/login?message=Inscription réussie, veuillez vous connecter');
        }
      } else {
        setError(result.error || 'Erreur lors de l\'inscription');
      }
    } catch (err) {
      console.error('🚨 Erreur lors de l\'inscription:', err);
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-[1fr_3fr] min-h-screen bg-gray-900">
      {/* Zone 25% avec texte */}
      <div className="flex items-center justify-center bg-sky-950 bg-opacity-50 text-white p-6">
        <p className="text-lg leading-relaxed">
          Embarquez vers de nouveaux horizons en toute simplicité.
          Réservez, explorez et vivez vos aventures maritimes avec notre plateforme intuitive.
        </p>
      </div>

      {/* Zone 75% avec le formulaire */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-xl container bg-sky-950/70 text-white shadow-xl rounded-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Inscription</h1>
          
          {/* Composant de test de connexion - À RETIRER EN PRODUCTION */}
          <AdvancedConnectionTest />
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="w-full p-2 rounded bg-white text-black placeholder:text-gray-500 disabled:opacity-50"
                required
              />
            </div>

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

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className="w-full p-2 rounded bg-white text-black placeholder:text-gray-500 disabled:opacity-50 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? '🙈' : '👁️'}
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
                <a href="/login" className="text-sm text-sky-300 hover:underline">
                  Vous avez déjà un compte ?
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
                {isLoading ? 'Inscription...' : 'S\'inscrire'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}