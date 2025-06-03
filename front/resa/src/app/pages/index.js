import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    const res = await fetch('/api/checkout-session', { method: 'POST' });
    const { id } = await res.json();

    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: id });

    setLoading(false);
  };

  return (
    <main className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-10 shadow-md rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Produit Test – 20 €</h1>
        <button
          onClick={handleClick}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Chargement...' : 'Payer maintenant'}
        </button>
      </div>
    </main>
  );
}
