'use client';

export default function LoginPage() {
  return (
    <div className="grid grid-cols-[1fr_3fr] min-h-screen">
      {/* --- Zone 25% avec filtre et texte --- */}
      <div className="flex items-center justify-center bg-black bg-opacity-50 text-white p-6">
        <p className="text-lg leading-relaxed">
          Partez à l’aventure en mer avec notre service de réservation maritime. 
          Découvrez des destinations uniques, profitez d’un confort exceptionnel à bord 
          et vivez une expérience inoubliable sur les flots.
        </p>
      </div>

      {/* --- Zone 75% avec la carte de connexion --- */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-[900px] bg-sky-950 text-white shadow-xl rounded-xl p-8 bg-opacity-70">
          <h1 className="text-3xl font-bold text-center mb-6">Connexion</h1>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded bg-white text-black placeholder:text-gray-500"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full p-2 rounded bg-white text-black placeholder:text-gray-500"
            />
            <button
              type="submit"
              className="w-full bg-sky-950 hover:bg-sky-800 text-white p-2 rounded"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
