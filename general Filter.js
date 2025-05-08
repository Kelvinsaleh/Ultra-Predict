function filterGeneralTips(predictions) {
  return predictions.filter(p => p.confidence >= 60 && p.confidence < 80);
}

module.exports = { filterGeneralTips };
