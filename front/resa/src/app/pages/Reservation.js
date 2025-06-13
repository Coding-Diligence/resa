"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function Reservation() {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const [voyage, setVoyage] = useState("aller_simple");

  const options = [
    { id: "aller_simple", label: "Voyage aller-retour", value: "aller_simple" },
    { id: "aller_retour", label: "Aller simple", value: "aller_retour" },
  ];

  const [showPassengers, setShowPassengers] = useState(false);
  const [tempAdults, setTempAdults] = useState(adults);
const [tempChildren, setTempChildren] = useState(children);


  const [routeInput, setRouteInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [showVehicule, setShowVehicule] = useState(false);
  const [vehicle, setVehicle] = useState("");
  const [tempVehicle, setTempVehicle] = useState("");

  const [showPetsPopup, setShowPetsPopup] = useState(false);
const [catCount, setCatCount] = useState(0);
const [dogCount, setDogCount] = useState(0);
const [tempCatCount, setTempCatCount] = useState(0);
const [tempDogCount, setTempDogCount] = useState(0);

const [showCalendar, setShowCalendar] = useState(false);
const [dateRange, setDateRange] = useState([
  {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }
]);
const calendarRef = useRef(null);
const containerRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowPassengers(false);
      setShowPetsPopup(false);
      setShowVehicule(false);
      setShowSuggestions(false);
      setShowCalendar(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


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
    <div className="w-full " ref={containerRef}>
      <form 
          className="w-3/4 p-6  mx-auto relative mt-10 bg-sky-950/70 rounded-2xl shadow-xl/30"
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
              setShowSuggestions(true);
              setShowPassengers(false);
              setShowPetsPopup(false);
              setShowVehicule(false);
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
                
                  <svg
    className="mx-4 w-6 h-6"
    fill="#082f49"
    height="200px"
    width="200px"
    viewBox="0 0 492.001 492.001"
  >
    <g>
      <path d="M487.971,235.993l-85.468-85.464c-5.22-5.228-14.396-5.228-19.616,0l-7.452,7.448c-5.4,5.408-5.4,14.548,0.004,19.956 
        l48.456,48.792H67.911l48.696-49.02c5.408-5.412,5.408-14.384,0-19.796l-7.444-7.524c-5.232-5.232-14.404-5.272-19.624-0.044 
        L4.035,235.813c-2.672,2.676-4.1,6.24-4.032,9.916c-0.072,3.82,1.36,7.396,4.032,10.068l85.464,85.464 
        c5.228,5.232,14.396,5.228,19.62,0l7.444-7.448c5.416-5.416,5.416-13.784,0-19.192l-49.856-49.436h358.792l-50.096,49.668 
        c-2.612,2.604-4.052,5.884-4.052,9.592s1.436,7.088,4.052,9.7l7.444,7.396c2.616,2.612,6.1,4.02,9.812,4.02 
        c3.716,0,7.196-1.448,9.812-4.06l85.5-85.508c2.664-2.668,4.096-6.248,4.028-9.924 
        C492.075,242.245,490.639,238.665,487.971,235.993z" />
    </g>
  </svg>

                  <span className="text-sky-950 font-semibold">{route.to}</span>
                  <span className="ml-2 text-gray-500">{route.countryTo}</span>
                </button>
              ))}
            </div>
          )}
        </div>


        {/* Dates */}
        <div className="mb-6 relative">
  <label className="block text-sm font-bold text-gray-300 mb-2">Quand souhaitez-vous voyager ?</label>
  <button
    type="button"
    onClick={() => setShowCalendar(!showCalendar)}
    className="w-full p-2 border bg-white border-gray-300 rounded-md text-sky-950 text-left"
  >
    {`${dateRange[0].startDate.toLocaleDateString()} → ${dateRange[0].endDate.toLocaleDateString()}`}
  </button>

  {showCalendar && (
  <div ref={calendarRef} className="absolute z-10 mt-2">
    <DateRange
      editableDateInputs={true}
      onChange={item => setDateRange([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={dateRange}
      rangeColors={["#e76f51"]}
    />
  </div>
)}

</div>


        <div className="flex items-end justify-between mt-15">
          <div className="flex gap-2">
            {/* 1) Véhicule */}
            <div className="relative">
                <label className="block text-sm font-bold text-gray-300 mb-2">Véhicule</label>
                <button
    type="button"
    onClick={() => setShowVehicule(!showVehicule)}
    className="flex items-center px-4 py-2 gap-2 border-2 border-[#e76f51] rounded-lg bg-white text-sky-950 font-bold text-sm hover:bg-sky-100"
  >
    {!vehicle ? (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
      >
        <path
          d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
          stroke="#082f49"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
          stroke="#082f49"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ) : (
      <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
        fill="#082f49"
      />
    </svg>
    )}
    {vehicle || "Comment voyagez-vous ?"}
  </button>


                {showVehicule && (
                  <div className="absolute text-sky-950 z-10 top-[-320px] left-0 w-80 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
                    <h4 className="font-semibold mb-4">Quel type de véhicule ?</h4>

                    {["Vélo", "Voiture", "Camping-car", "Moto et sidecar", "Moto", "Minibus", "Fourgonnette", "Passager piéton"].map((v, i) => (
                      <label key={i} className="flex items-center justify-between mb-2 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-sky-950 rounded-full flex items-center justify-center">
                            {tempVehicle === v && <div className="w-3 h-3 bg-sky-950 rounded-full" />}
                          </div>
                          <span>{v}</span>
                        </div>
                        <input
                          type="radio"
                          name="vehicule"
                          value={v}
                          className="hidden"
                          checked={tempVehicle === v}
                          onChange={() => setTempVehicle(v)}
                        />
                      </label>
                    ))}
                    <button
  className="w-full mt-4 py-1 bg-[#e76f51] text-white rounded-md hover:brightness-105"
  onClick={() => {
    setVehicle(tempVehicle); // confirme le véhicule
    setShowVehicule(false); // ferme le popup
  }}
>
  Confirmer
</button>

                  </div>
                )}
            </div>

          {/* 2) Passagers */}
          <div className="relative">
    <label className="block text-sm font-bold text-gray-300 mb-2">Passagers</label>
    <button
      type="button"
      onClick={() => {
        setShowPassengers(true);
        setShowPetsPopup(false);
        setShowVehicule(false);
        setShowSuggestions(false);
        setTempAdults(adults);
        setTempChildren(children);
      }}
      
      className="flex items-center px-4 py-2 gap-2 border-2 border-[#e76f51] rounded-lg bg-white text-sky-950 font-bold text-sm hover:bg-sky-100"
    >
      {(adults > 0 || children > 0) && (
        <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
          fill="#082f49"
        />
      </svg>
      )}
      {(adults > 0 || children > 0)
        ? `${adults} adulte${adults > 1 ? 's' : ''}${children > 0 ? `, ${children} enfant${children > 1 ? 's' : ''}` : ''}`
        : "Aucun passager"}
    </button>

    {/* Popup passagers */}
    {showPassengers && (
      <div className="absolute text-sky-950 z-10 top-[-160px] left-0 w-72 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
        <h4 className="font-semibold mb-4">Nombre de passagers</h4>

        {[
          { label: "Adultes", value: tempAdults, setter: setTempAdults, min: 1 },
          { label: "Enfants", value: tempChildren, setter: setTempChildren, min: 0 },
        ].map(({ label, value, setter, min }) => (
          <div key={label} className="flex justify-between items-center mb-4">
            <span>{label}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setter(Math.max(min, value - 1))}
                className="text-xl px-2 py-1 rounded-full hover:bg-gray-200"
              >
                −
              </button>
              <span>{value}</span>
              <button
                type="button"
                onClick={() => setter(value + 1)}
                className="text-xl px-2 py-1 rounded-full hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            setAdults(tempAdults);
            setChildren(tempChildren);
            setShowPassengers(false);
          }}
          className="w-full py-1 bg-[#e76f51] text-white rounded-md hover:brightness-95"
        >
          Confirmer
        </button>
      </div>
    )}
  </div>


          {/* 3) Animaux */}
          <div className="relative">
    <label className="block text-sm font-bold text-gray-300 mb-2">Animaux</label>
    <button
      type="button"
      onClick={() => setShowPetsPopup(!showPetsPopup)}
      className="flex items-center px-4 py-2 gap-2 border-2 border-[#e76f51] rounded-lg bg-white text-sky-950 font-bold text-sm hover:bg-sky-100"
    >
      {catCount + dogCount > 0 ? (
        <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
          fill="#082f49"
        />
      </svg>
      ):(
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          <path
            d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
            stroke="#082f49"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
            stroke="#082f49"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )
      } 
      {catCount + dogCount > 0
        ? `${catCount} chat${catCount > 1 ? "s" : ""}, ${dogCount} chien${dogCount > 1 ? "s" : ""}`
        : "Aucun animal"}
    </button>

    {showPetsPopup && (
      <div className="absolute text-sky-950 z-10 top-[-190px] left-0 w-72 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
        <h4 className="font-semibold mb-4">Animaux à bord</h4>

        {[{ label: "Chat", value: tempCatCount, setter: setTempCatCount, icon: "🐾" },
          { label: "Chien", value: tempDogCount, setter: setTempDogCount, icon: "🐾" }
        ].map(({ label, value, setter }, i) => (
          <div key={i} className="flex justify-between items-center mb-4  rounded-lg px-4">
            <div className="flex items-center gap-2 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#082f49"
                className="w-5 h-5"
              >
                <path d="M4 6a2 2 0 104 0 2 2 0 00-4 0zm7.5 1.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM14 9a3 3 0 100-6 3 3 0 000 6zm4.5 1.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM12 10c-2.5 0-6 1-6 5s2.5 4 6 4 6-1 6-4-3.5-5-6-5z" />
              </svg>
              {label}
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setter(Math.max(0, value - 1))} className="text-xl px-2 py-1 rounded-full hover:bg-gray-200">−</button>
              <span className="font-bold text-sky-950">{value}</span>
              <button type="button" onClick={() => setter(value + 1)} className="text-xl px-2 py-1 rounded-full hover:bg-gray-200">+</button>
            </div>
          </div>
        ))}

<button
  type="button"
  onClick={() => {
    setCatCount(tempCatCount);   // confirme les chats
    setDogCount(tempDogCount);   // confirme les chiens
    setShowPetsPopup(false);     // ferme le popup
  }}
  className="w-full py-1 bg-[#e76f51] text-white rounded-md hover:brightness-95"
>
  Confirmer
</button>

      </div>
    )}
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
    </div>
  );
}
