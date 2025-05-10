// pages/vip.js

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PredictionTable from '../components/PredictionTable';

export default function VIP() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetch('/api/predictions/vip')
      .then(res => res.json())
      .then(data => setPredictions(data));
  }, []);

  return (
    <div className="min-h-screen bg-green-50 text-black">
      <Navbar />
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">VIP Predictions</h2>
        <PredictionTable predictions={predictions} />
      </main>
    </div>
  );
}
