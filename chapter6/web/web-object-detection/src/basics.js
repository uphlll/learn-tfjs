import * as tf from "@tensorflow/tfjs";
import "core-js/stable";
import "regenerator-runtime/runtime";

tf.ready().then(() => {
  const modelPath =
    "https://tfhub.dev/tensorflow/tfjs-model/ssd_mobilenet_v2/1/default/1";
  tf.tidy(() => {
    tf.loadGraphModel(modelPath, { fromTFHub: true }).then((model) => {
      const mysteryImage = document.getElementById("mystery");
      const myTensor = tf.browser.fromPixels(mysteryImage);
      // SSD Mobilenet
      const readyfied = tf.expandDims(myTensor, 0);

      model.executeAsync(readyfied).then((result) => {
        console.log("First", result[0].shape);
        result[0].print();
        console.log("Second", result[1].shape);
        result[1].print();
      });
    });
  });
});
