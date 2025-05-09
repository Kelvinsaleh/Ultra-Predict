// backend/services/firebaseService.js

const admin = require('firebase-admin');

// Load environment variables
require('dotenv').config();

// Parse the service account JSON string from the .env file
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const db = admin.firestore();
const usersCollection = db.collection('users');
const predictionsCollection = db.collection('predictions');

// Save prediction to Firestore
const savePrediction = async (userId, predictionData) => {
  try {
    await predictionsCollection.add({
      userId,
      ...predictionData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    throw new Error('Failed to save prediction: ' + error.message);
  }
};

// Get predictions for a user
const getUserPredictions = async (userId) => {
  try {
    const snapshot = await predictionsCollection.where('userId', '==', userId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error('Failed to retrieve predictions: ' + error.message);
  }
};

// Check VIP subscription status
const isUserVIP = async (userId) => {
  try {
    const userDoc = await usersCollection.doc(userId).get();
    if (!userDoc.exists) return false;

    const userData = userDoc.data();
    const now = new Date();
    return userData.vipExpiry && userData.vipExpiry.toDate() > now;
  } catch (error) {
    throw new Error('Failed to verify VIP status: ' + error.message);
  }
};

// Update VIP subscription
const updateVIPStatus = async (userId, expiryDate) => {
  try {
    await usersCollection.doc(userId).set(
      { vipExpiry: admin.firestore.Timestamp.fromDate(new Date(expiryDate)) },
      { merge: true }
    );
  } catch (error) {
    throw new Error('Failed to update VIP status: ' + error.message);
  }
};

module.exports = {
  savePrediction,
  getUserPredictions,
  isUserVIP,
  updateVIPStatus,
};
