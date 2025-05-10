// vip_system/paymentWebhook.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.handleVipPayment = functions.https.onRequest(async (req, res) => {
  const event = req.body;

  if (event.event_type === 'CHECKOUT.ORDER.APPROVED') {
    const payerEmail = event.resource.payer.email_address;

    const vipUntil = new Date();
    vipUntil.setMonth(vipUntil.getMonth() + 1); // 1-month VIP access

    await admin.firestore().collection('vip_users').doc(payerEmail).set({
      email: payerEmail,
      access_granted: true,
      expires_at: vipUntil.toISOString(),
    });

    return res.status(200).send('VIP Access Granted');
  }

  return res.status(400).send('Unhandled event type');
});
