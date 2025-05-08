const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { filterVipTips } = require("./vipFilter");
const { filterGeneralTips } = require("./generalFilter");

admin.initializeApp();
const db = admin.firestore();

// Replace this with real AI model fetch if needed
async function fetchPredictions() {
  // Simulated predictions — replace with actual model output
  return [
    { match: "Man City vs Spurs", prediction: "GG", market: "GG", confidence: 92, odds: 1.78 },
    { match: "PSG vs Lille", prediction: "Over 2.5", market: "Over", confidence: 95, odds: 1.55 },
    { match: "AC Milan vs Inter", prediction: "1", market: "1X2", confidence: 84, odds: 1.60 },
    { match: "Roma vs Napoli", prediction: "Under 2.5", market: "Under", confidence: 77, odds: 1.72 },
    { match: "Barça vs Getafe", prediction: "1", market: "1X2", confidence: 69, odds: 1.80 }
  ];
}

exports.generatePredictions = functions.pubsub.schedule("every day 06:00").timeZone("Africa/Nairobi").onRun(async (context) => {
  const predictions = await fetchPredictions();

  const vipSlip = filterVipTips(predictions);
  const generalTips = filterGeneralTips(predictions);

  const today = new Date().toISOString().split("T")[0];

  if (vipSlip) {
    await db.collection("vipTips").doc(today).set(vipSlip);
  }

  if (generalTips.length > 0) {
    await db.collection("generalTips").doc(today).set({ tips: generalTips });
  }

  console.log("Predictions updated:", today);
});
