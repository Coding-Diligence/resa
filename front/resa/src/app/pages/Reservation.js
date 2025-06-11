"use client";
import Link from "next/link";
import { useState } from "react";

export default function Reservation() {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => setter(Math.max(0, value - 1));

  const [voyage, setVoyage] = useState("aller_simple");

  const options = [
    { id: "aller_simple", label: "Voyage aller-retour", value: "aller_simple" },
    { id: "aller_retour", label: "Aller simple", value: "aller_retour" },
  ];

  const [showPassengers, setShowPassengers] = useState(false);
  const [showPets, setShowPets] = useState(false);

  const [routeInput, setRouteInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const routes = [
    { from: "Toulon", to: "Ajaccio", countryFrom: "France", countryTo: "Corse" },
    { from: "Ajaccio", to: "Toulon", countryFrom: "Corse", countryTo: "France" },
    { from: "Marseille", to: "Nice", countryFrom: "France", countryTo: "France" },
    { from: "Nice", to: "Marseille", countryFrom: "France", countryTo: "France" },
  ];

  const filteredRoutes = routes.filter((route) =>
    `${route.from} - ${route.to}`
      .toLowerCase()
      .includes(routeInput.toLowerCase())
  );

  return (
    <form 
        className="w-3/4 p-6 relative mt-10 bg-sky-950/70 rounded-2xl shadow-xl/30"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          console.log("Formulaire soumis avec :", Object.fromEntries(formData));
        }}
      >

      {/* type voyage */}
      <div className="flex items-center gap-4 text-white mb-4">
  {options.map(({ id, label, value }) => (
    <label key={id} htmlFor={id} className="flex items-center  gap-2 cursor-pointer">
      <input
        type="radio"
        name="voyage"
        id={id}
        value={value}
        className="sr-only peer"
        checked={voyage === value}
        onChange={() => setVoyage(value)}
      />

      {/* Cercle extérieur avec bord blanc */}
      <div className="
        w-5 h-5 
        flex items-center justify-center 
        border-2 border-white rounded-full 
        bg-transparent
        transition-colors
      ">
        {/* Petit rond intérieur - change de couleur selon si c'est sélectionné */}
        <div className={`
          w-3 h-3 rounded-full 
          transition-colors 
          ${voyage === value ? 'bg-white' : 'bg-transparent'}
        `} />
      </div>

      <span className="text-md font-medium">{label}</span>
    </label>
  ))}
      </div>

      
      {/* Champ de saisie pour la route */}
      <div className="mb-4 relative">
        <label htmlFor="route" className="block text-sm font-bold text-gray-300">Route</label>
        <input
          type="text"
          id="route"
          name="route"
          required
          value={routeInput}
          onChange={(e) => {
            setRouteInput(e.target.value);
            setShowSuggestions(true); // Afficher les suggestions dès qu'il y a de la saisie
          }}
          className="mt-1 block w-full p-2 border border-gray-300 bg-white text-sky-950 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Entrez un port ..."
        />
        {/* Suggestions */}
        {showSuggestions && filteredRoutes.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
            {filteredRoutes.map((route, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setRouteInput(`${route.from} - ${route.to}`);
                  setShowSuggestions(false); // Masquer les suggestions après sélection
                }}
                className="flex items-center px-4 py-2 w-full hover:bg-gray-100"
              >
                <span className="text-sky-950 font-semibold">{route.from}</span>
                <span className="ml-2 text-gray-500">{route.countryFrom}</span>
                <svg className="mx-4 w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 18L6 12L12 6" stroke="#082f49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sky-950 font-semibold">{route.to}</span>
                <span className="ml-2 text-gray-500">{route.countryTo}</span>
              </button>
            ))}
          </div>
        )}
      </div>


      {/* Dates */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-300 mb-2">Quand souhaitez-vous voyager ?</label>
        <div className="flex space-x-4">
          <input type="date" name="startDate" required className="block w-1/2 p-2 border border-gray-300 bg-white text-sky-950 rounded-md focus:ring-blue-500 focus:border-blue-500" />
          <input type="date" name="endDate" required className="block w-1/2 p-2 border border-gray-300 bg-white text-sky-950 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div className="flex items-end justify-between mt-15">

        <div className="flex gap-2">
           {/* 1) Véhicule */}
        <div>
        <label className="block text-sm font-bold text-gray-300 mb-2">Véhicule</label>
        <button
          type="button"
          onClick={() => {/* toggle votre popup “Comment voyagez-vous?” */}}
          className="flex items-center px-4 py-2  gap-3 border-2 border-[#e76f51] rounded-lg bg-white text-sky-950 font-bold text-sm hover:bg-sky-100"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44771 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8Z" fill="#082f49"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z" fill="#082f49"></path> </g></svg>
          Comment voyagez-vous ?
        </button>
        </div>
        

        
        {/* 2) Passagers */}
<div className="relative">
  <label className="block text-sm font-bold text-gray-300 mb-2">Passagers</label>
  <button
    type="button"
    onClick={() => setShowPassengers(!showPassengers)}
    className="flex items-center px-4 py-2 gap-3 border-2 border-[#e76f51] rounded-lg bg-white text-sky-950 font-bold text-sm hover:bg-sky-100"
  >
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44771 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8Z" fill="#082f49"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z" fill="#082f49"></path> </g></svg>
    {adults + children} {adults + children === 1 ? "personne" : "personnes"}
  </button>

  {/* Popup de passagers */}
  {showPassengers && (
    <div className="absolute  text-sky-950 z-10 top-[-140px] left-0 w-64 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      <h4 className="font-semibold mb-2">Nombre de passagers</h4>
      
      <div className="flex justify-between items-center mb-2">
        <span>Adultes</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => decrement(setAdults, adults)} disabled={adults <= 1} className="text-xl px-2 py-1 rounded-full hover:bg-gray-200">-</button>
          <span>{adults}</span>
          <button type="button" onClick={() => increment(setAdults, adults)} className="text-xl px-2 py-1 rounded-full hover:bg-gray-200">+</button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span>Enfants</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => decrement(setChildren, children)} disabled={children <= 0} className="text-xl px-2 py-1 rounded-full hover:bg-gray-200">-</button>
          <span>{children}</span>
          <button type="button" onClick={() => increment(setChildren, children)} className="text-xl px-2 py-1 rounded-full hover:bg-gray-200">+</button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowPassengers(false)}
        className="w-full py-1 bg-[#e76f51] text-white rounded-md hover:brightness-95"
      >
        Confirmer
      </button>
    </div>
  )}
</div>

        {/* 3) Animaux */}
        <div>
        <label className="block text-sm font-bold text-gray-300 mb-2">Animaux</label>
        <button
          type="button"
          onClick={() => {/* toggle votre popup “Comment voyagez-vous?” */}}
          className="flex items-center px-4 py-2  gap-3 border-2 border-[#e76f51] rounded-lg bg-white text-sky-950 font-bold text-sm hover:bg-sky-100"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44771 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8Z" fill="#082f49"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z" fill="#082f49"></path> </g></svg>
          0 Animaux
        </button>
        </div>

        </div>

       

        {/* 4) Bouton Rechercher */}
        <button
          type="submit"
          className="px-5 py-2 text-lg font-bold bg-[#e76f51] text-white rounded-md hover:brightness-125 transition"
        >
          Rechercher
        </button>
      </div>

    
    </form>
  );
}
