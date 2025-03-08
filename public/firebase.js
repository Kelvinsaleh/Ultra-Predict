// firebase.js - Fixed Firestore Initialization
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json"); // Ensure this file exists

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = db;
