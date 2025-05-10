// backend/functions/firestoreService.js

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.savePredictions = async (type, predictions) => {
  const batch = db.batch();
  const collection = db.collection(type); // 'vip', 'free', or 'bet'

  predictions.forEach(pred => {
    const doc = collection.doc();
    batch.set(doc, {
      matchId: pred.matchId,
      predictedOutcome: pred.predictedOutcome,
      confidence: pred.confidence,
      createdAt: new Date().toISOString(),
    });
  });

  await batch.commit();
};
