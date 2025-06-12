'use client';

import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'inscription.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccessMessage("Inscription réussie !");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
      <div className="grid grid-cols-[1fr_3fr] min-h-screen">
        {/* Zone texte gauche */}
        <div className="flex items-center justify-center bg-sky-950 bg-opacity-50 text-white p-6">
          <p className="text-lg leading-relaxed">
            Embarquez vers de nouveaux horizons en toute simplicité.
            Réservez, explorez et vivez vos aventures maritimes avec notre plateforme intuitive.
          </p>
        </div>

        {/* Zone formulaire droite */}
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-xl container bg-sky-950/70 text-white shadow-xl rounded-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Inscription</h1>

            {successMessage && (
                <p className="text-green-400 text-center mb-4">{successMessage}</p>
            )}
            {errorMessage && (
                <p className="text-red-400 text-center mb-4">{errorMessage}</p>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                  name="name"
                  type="text"
                  placeholder="Nom"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black placeholder:text-gray-500"
              />
              <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black placeholder:text-gray-500"
              />
              <input
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black placeholder:text-gray-500"
              />
              <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirme Mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black placeholder:text-gray-500"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center text-sm text-gray-300">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Se souvenir de moi</span>
                  </label>
                  <a href="/login" className="text-sm text-sky-300 hover:underline">
                    Vous avez déjà un compte ?
                  </a>
                </div>
                <button
                    type="submit"
                    className="px-4 py-1 bg-gradient-to-r from-sky-950 to-sky-800 text-white rounded-md
                  hover:brightness-120 transition duration-300 ease-in-out
                  focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 cursor-pointer"
                >
                  S'inscrire
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}
