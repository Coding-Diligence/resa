'use client';

export default function RegisterPage() {
  return (
    <div className="grid grid-cols-[1fr_3fr] min-h-screen">
      {/* --- Zone 25% avec filtre et texte --- */}
      <div className="flex items-center justify-center bg-sky-950 bg-opacity-50 text-white p-6">
        <p className="text-lg leading-relaxed">
          Embarquez vers de nouveaux horizons en toute simplicité.
          Réservez, explorez et vivez vos aventures maritimes avec notre plateforme intuitive.
        </p>
      </div>

      {/* --- Zone 75% avec la carte d'inscription --- */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-xl container bg-sky-950/70 text-white shadow-xl rounded-xl p-8">
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
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center text-sm text-gray-300">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Se souvenir de moi</span>
              </label>
              <a href="/login" className="text-sm text-sky-300 hover:underline">Vous avez déjà un compte ?</a>
            </div>
            <button
              type="submit"
              className="px-4 py-1 bg-gradient-to-r from-sky-950 to-sky-800 text-white rounded-md 
              hover:brightness-120 transition duration-300 ease-in-out 
              focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 cursor-pointer"
              >
              Se connecter
            </button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}
