// vip_system/checkVipAccess.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.checkVipAccess = functions.https.onCall(async (data, context) => {
  const email = data.email;
  const doc = await admin.firestore().collection('vip_users').doc(email).get();

  if (!doc.exists) return { access: false };

  const expiresAt = new Date(doc.data().expires_at);
  return { access: new Date() < expiresAt };
});
