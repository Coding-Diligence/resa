'use client';

export default function RegisterPage() {
  return (
    <div className="grid grid-cols-[1fr_3fr] min-h-screen">
      {/* --- Zone 25% avec filtre et texte --- */}
      <div className="flex items-center justify-center bg-black bg-opacity-50 text-white p-6">
        <p className="text-lg leading-relaxed">
          Embarquez vers de nouveaux horizons en toute simplicité.
          Réservez, explorez et vivez vos aventures maritimes avec notre plateforme intuitive.
        </p>
      </div>

      {/* --- Zone 75% avec la carte d'inscription --- */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-sky-950 text-white shadow-xl rounded-xl p-8 bg-opacity-70">
          <h1 className="text-3xl font-bold text-center mb-6">Inscription</h1>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nom"
              className="w-full p-2 rounded bg-white text-black placeholder:text-gray-500"
            />
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
            <input
              type="password"
              placeholder="Confirme Mot de passe"
              className="w-full p-2 rounded bg-white text-black placeholder:text-gray-500"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
            >
              S’inscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
