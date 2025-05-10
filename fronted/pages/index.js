// pages/index.js

import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>UltraPredict - Home</title>
      </Head>
      <main className="min-h-screen bg-green-50 text-black p-4">
        <div className="max-w-4xl mx-auto border-2 border-black rounded-2xl p-6 bg-white shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-center text-green-700">Welcome to UltraPredict</h1>
          <p className="text-center text-gray-700 mb-6">Your trusted source for free, VIP, and Bet of the Day football predictions.</p>

          <table className="table-auto w-full border border-black">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-4 py-2 border border-black">Date</th>
                <th className="px-4 py-2 border border-black">Match</th>
                <th className="px-4 py-2 border border-black">Prediction</th>
                <th className="px-4 py-2 border border-black">Confidence</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="border px-4 py-2">May 11</td>
                <td className="border px-4 py-2">Real Madrid vs Barcelona</td>
                <td className="border px-4 py-2">Over 2.5 Goals</td>
                <td className="border px-4 py-2 text-green-600 font-bold">87%</td>
              </tr>
              {/* More predictions can be mapped here from fetched data */}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
