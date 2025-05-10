// pages/free.js

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PredictionTable from '../components/PredictionTable';

export default function Free() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetch('/api/predictions/free')
      .then(res => res.json())
      .then(data => setPredictions(data));
  }, []);

  return (
    <div className="min-h-screen bg-green-50 text-black">
      <Navbar />
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">Free Predictions</h2>
        <PredictionTable predictions={predictions} />
      </main>
    </div>
  );
}
