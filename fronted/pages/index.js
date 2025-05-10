// pages/index.js

import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-green-50 text-black">
      <Navbar />
      <main className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to AI Football Predictions</h1>
        <p className="text-lg">Accurate and automated predictions for football fans and punters.</p>
      </main>
    </div>
  );
}
