// components/PredictionTable.js

export default function PredictionTable({ predictions }) {
  return (
    <div className="overflow-x-auto border border-black rounded-xl shadow p-4 bg-white">
      <table className="w-full text-left border-collapse">
        <thead className="bg-green-100 border-b border-black">
          <tr>
            <th className="p-2 border-r border-black">Match ID</th>
            <th className="p-2 border-r border-black">Predicted Outcome</th>
            <th className="p-2 border-r border-black">Confidence</th>
            <th className="p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {predictions.length > 0 ? (
            predictions.map((match, i) => (
              <tr key={i} className="border-t border-black">
                <td className="p-2 border-r border-black">{match.matchId}</td>
                <td className="p-2 border-r border-black">{match.predictedOutcome}</td>
                <td className="p-2 border-r border-black">{(match.confidence * 100).toFixed(2)}%</td>
                <td className="p-2">{new Date(match.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No predictions available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
