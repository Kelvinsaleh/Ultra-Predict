// backend/functions/retrainModel.js

const functions = require('firebase-functions');
const { trainModel, loadModel, predict } = require('./mlModel');
const { fetchHistoricalData, fetchUpcomingFixtures } = require('./dataFetcher');
const { savePredictions } = require('./firestoreService');

exports.retrainEvery14Days = functions.pubsub
  .schedule('every 336h') // 14 days
  .timeZone('Etc/UTC')
  .onRun(async () => {
    const teamIds = [33, 34, 35]; // example team IDs
    const historical = await fetchHistoricalData(teamIds);
    const inputData = historical.map(m => [/* feature extraction */]);
    const labels = historical.map(m => [1, 0, 0]); // dummy one-hot labels

    const model = await trainModel(inputData, labels);
    console.log("Model trained and saved to Firebase Storage.");
  });

exports.predictDaily = functions.pubsub
  .schedule('every day 07:00')
  .timeZone('Etc/UTC')
  .onRun(async () => {
    const model = await loadModel();
    const fixtures = await fetchUpcomingFixtures();

    const predictions = fixtures.map(f => {
      const input = [/* feature extraction */];
      const result = predict(model, input);
      const [home, draw, away] = result;

      const max = Math.max(home, draw, away);
      const outcome = max === home ? 'Home' : max === draw ? 'Draw' : 'Away';

      return {
        matchId: f.fixture.id,
        predictedOutcome: outcome,
        confidence: max,
      };
    });

    const vip = predictions.filter(p => p.confidence >= 0.85);
    const free = predictions.filter(p => p.confidence >= 0.65 && p.confidence < 0.85);
    const bet = vip.length > 0 ? [vip.sort((a, b) => b.confidence - a.confidence)[0]] : [];

    await savePredictions('vip', vip);
    await savePredictions('free', free);
    await savePredictions('bet', bet);
  });
