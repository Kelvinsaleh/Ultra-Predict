// pages/bet.js

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PredictionTable from '../components/PredictionTable';

export default function BetOfTheDay() {
  const [prediction, setPrediction] = useState([]);

  useEffect(() => {
    fetch('/api/predictions/botd')
      .then(res => res.json())
      .then(data => setPrediction(data ? [data] : []));
  }, []);

  return (
    <div className="min-h-screen bg-green-50 text-black">
      <Navbar />
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">Bet of the Day</h2>
        <PredictionTable predictions={prediction} />
      </main>
    </div>
  );
}
