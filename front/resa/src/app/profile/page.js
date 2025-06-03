"use client";

import { useState } from "react";
import Link from "next/link";

export default function Profile() {
    return (
        <div className="m-auto flex flex-col items-center mt-10 justify-center w-full relative">
            <h1 className="text-2xl font-bold mb-4">Modifier mon profile</h1>
            <div className="bg-sky-950/70 p-6 rounded-2xl shadow-xl/30 w-full max-w-md">
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 bg-white text-sky-950 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Votre nom"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 bg-white text-sky-950 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Votre email"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-2/4 m-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                    >
                        Enregistrer
                    </button>
                </form>
            </div>
        </div>
    );
}