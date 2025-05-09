const predictionService = require('../services/predictionService');

exports.getPrediction = async (req, res) => {
  try {
    const inputData = req.query.data; // Data passed from frontend
    const prediction = await predictionService.getPrediction(inputData);
    res.json({ prediction });
  } catch (err) {
    res.status(500).send({ error: 'Error fetching prediction' });
  }
};
