// firebase.js - Fixed
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json"); // Ensure this file exists

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ultrapredict-d60f4-default-rtdb.firebaseio.com"
});

const db = admin.firestore();
module.exports = db;
