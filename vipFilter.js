function filterVipTips(predictions) {
  const highConfidence = predictions.filter(p => p.confidence >= 80);

  let bestSlip = null;

  for (let r = 2; r <= 4; r++) {
    const combos = getCombinations(highConfidence, r);

    combos.forEach(combo => {
      const totalOdds = combo.reduce((acc, tip) => acc * tip.odds, 1);

      if (totalOdds >= 3.0 && totalOdds <= 7.0) {
        const avgConfidence = combo.reduce((acc, tip) => acc + tip.confidence, 0) / combo.length;

        if (!bestSlip || avgConfidence > bestSlip.avgConfidence) {
          bestSlip = {
            tips: combo,
            totalOdds: parseFloat(totalOdds.toFixed(2)),
            avgConfidence: parseFloat(avgConfidence.toFixed(2))
          };
        }
      }
    });
  }

  return bestSlip;
}

function getCombinations(arr, r) {
  const result = [];

  const combine = (start, combo) => {
    if (combo.length === r) {
      result.push([...combo]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      combo.push(arr[i]);
      combine(i + 1, combo);
      combo.pop();
    }
  };

  combine(0, []);
  return result;
}

module.exports = { filterVipTips };
