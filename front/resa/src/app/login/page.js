'use client';

import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const { email, password } = formData;

    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("http://localhost:1845/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur de connexion.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccessMessage("Connexion réussie !");
      setFormData({ email: "", password: "" });

      // Tu peux rediriger après connexion ici :
      // window.location.href = "/dashboard";

    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
      <div className="grid grid-cols-[1fr_3fr] min-h-screen">
        {/* --- Zone gauche --- */}
        <div className="flex items-center justify-center bg-sky-950 bg-opacity-50 text-white p-6">
          <p className="text-lg leading-relaxed">
            Partez à l’aventure en mer avec notre service de réservation maritime.
            Découvrez des destinations uniques, profitez d’un confort exceptionnel à bord
            et vivez une expérience inoubliable sur les flots.
          </p>
        </div>

        {/* --- Zone droite --- */}
        <div className="flex flex-col text-sky-950 items-center justify-center p-6">
          <div className="w-full container bg-sky-950/70 text-white shadow-xl rounded-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-6">Connexion</h2>

            {successMessage && (
                <p className="text-green-400 text-center mb-4">{successMessage}</p>
            )}
            {errorMessage && (
                <p className="text-red-400 text-center mb-4">{errorMessage}</p>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black placeholder:text-gray-500"
              />
              <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black placeholder:text-gray-500"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center text-sm text-gray-300">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Se souvenir de moi</span>
                  </label>
                  <a href="#" className="text-sm text-sky-300 hover:underline">Mot de passe oublié ?</a>
                  <a href="/register" className="text-sm text-sky-300 hover:underline">Créer un compte</a>
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
