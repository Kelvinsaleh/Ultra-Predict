// backend/functions/mlModel.js

const tf = require('@tensorflow/tfjs-node');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');

admin.initializeApp();
const bucket = admin.storage().bucket();

const MODEL_PATH = 'model/latest';

exports.trainModel = async (trainingData, labels) => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [trainingData[0].length], units: 16, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));

  model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  await model.fit(tf.tensor2d(trainingData), tf.tensor2d(labels), {
    epochs: 20,
    shuffle: true,
  });

  // Save to Firebase Storage
  await model.save(`gs://${process.env.STORAGE_BUCKET}/${MODEL_PATH}`);
  return model;
};

exports.loadModel = async () => {
  return await tf.loadLayersModel(`gs://${process.env.STORAGE_BUCKET}/${MODEL_PATH}/model.json`);
};

exports.predict = async (model, inputData) => {
  const prediction = model.predict(tf.tensor2d([inputData]));
  return prediction.arraySync()[0];
};
