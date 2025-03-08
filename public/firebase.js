const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json"); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com"
});

const db = admin.firestore();
module.exports = db;
