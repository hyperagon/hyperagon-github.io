const CANVAS_SIZE = 280;
const CANVAS_SCALE = 0.5;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const clearButton = document.getElementById("clear-button");

let isMouseDown = false;
let hasIntroText = true;
let lastX = 0;
let lastY = 0;

// Load our model
const model = tf.loadLayersModel("model"); // <NAME>.json + <NAME>-weights.bin
const loadingModelPromise = model.ready;

// Add 'Draw a number here!' to the canvas.
ctx.lineWidth = 28;
ctx.lineJoin = "round";
ctx.font = "28px sans-serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "#212121";
ctx.fillText("Wait", CANVAS_SIZE / 2, CANVAS_SIZE / 2);

// Set the line color for the canvas.
ctx.strokeStyle = "#212121";

function clearCanvas() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const element = document.getElementById('prediction');
    element.innerText = '?';
}

function drawLine(fromX, fromY, toX, toY) {
  // Draws a line from (fromX, fromY) to (toX, toY).
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.closePath();
  ctx.stroke();
  updatePredictions();
}

async function updatePredictions() {
  // Get the predictions for the canvas data.
  const imgData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  const input = tf.browser.fromPixels(imgData.data, 4)
 // new onnx.Tensor(new Float32Array(imgData.data), "float32");
 // model.predict([input]); // tf.browser.fromPixels(im, 4)

  const outputMap = model.predict(input); //await sess.run([input]);
  const outputTensor = outputMap.values().next().value;
  const predictions = outputTensor.data;
  const maxPrediction = Math.max(...predictions);

    const element = document.getElementById('prediction');
    //console.log(predictions);
    let pred = predictions.indexOf(maxPrediction);
    if (pred >= 0) {
        element.innerText = pred;
    } else {
        element.innerText = '?';
    }
}

function canvasMouseDown(event) {
  isMouseDown = true;
  if (hasIntroText) {
    clearCanvas();
    hasIntroText = false;
  }
  const x = event.offsetX / CANVAS_SCALE;
  const y = event.offsetY / CANVAS_SCALE;

  // To draw a dot on the mouse down event, we set laxtX and lastY to be
  // slightly offset from x and y, and then we call `canvasMouseMove(event)`,
  // which draws a line from (laxtX, lastY) to (x, y) that shows up as a
  // dot because the difference between those points is so small. However,
  // if the points were the same, nothing would be drawn, which is why the
  // 0.001 offset is added.
  lastX = x + 0.001;
  lastY = y + 0.001;
  canvasMouseMove(event);
}

function canvasMouseMove(event) {
  const x = event.offsetX / CANVAS_SCALE;
  const y = event.offsetY / CANVAS_SCALE;
  if (isMouseDown) {
    drawLine(lastX, lastY, x, y);
  }
  lastX = x;
  lastY = y;
}

function bodyMouseUp() {
  isMouseDown = false;
}

function bodyMouseOut(event) {
  // We won't be able to detect a MouseUp event if the mouse has moved
  // ouside the window, so when the mouse leaves the window, we set
  // `isMouseDown` to false automatically. This prevents lines from
  // continuing to be drawn when the mouse returns to the canvas after
  // having been released outside the window.
  if (!event.relatedTarget || event.relatedTarget.nodeName === "HTML") {
    isMouseDown = false;
  }
}

loadingModelPromise.then(() => {
  canvas.addEventListener("mousedown", canvasMouseDown);
  canvas.addEventListener("mousemove", canvasMouseMove);
  document.body.addEventListener("mouseup", bodyMouseUp);
  document.body.addEventListener("mouseout", bodyMouseOut);
  clearButton.addEventListener("mousedown", clearCanvas);

  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillText("Draw!", CANVAS_SIZE / 2, CANVAS_SIZE / 2);

/*
// Be sure to load TensorFlow.js on your page. See
// https://github.com/tensorflow/tfjs#getting-started.

const model = await tf.loadGraphModel(
    'https://www.kaggle.com/models/google/mobilenet-v3/frameworks/TfJs/variations/small-075-224-classification/versions/1',
    { fromTFHub: true });

// Preprocesses a single image tensor to prepare it as input for the model.
//
// Returns a tensor of shape [batch_size, height, width, channels], where the
// batch_size in this case is 1.
function preprocess(imageTensor) {
  const widthToHeight = imageTensor.shape[1] / imageTensor.shape[0];
  let squareCrop;
  if (widthToHeight > 1) {
    const heightToWidth = imageTensor.shape[0] / imageTensor.shape[1];
    const cropTop = (1-heightToWidth) / 2;
    const cropBottom = 1 - cropTop;
    squareCrop = [[cropTop, 0, cropBottom, 1]];
  } else {
    const cropLeft = (1-widthToHeight) / 2;
    const cropRight = 1 - cropLeft;
    squareCrop = [[0, cropLeft, 1, cropRight]];
  }
  // Expand image input dimensions to add a batch dimension of size 1.
  const crop = tf.image.cropAndResize(
      tf.expandDims(imageTensor), squareCrop, [0], [224, 224]);
  return crop.div(255);
}

const image = document.getElementById('img-id');
const imageTensor = tf.browser.fromPixels(image);
const logits = model.predict(preprocess(imageTensor));

const classIndex = await tf.argMax(tf.squeeze(logits)).data();
const className = model.metadata['classNames'][classIndex[0]];
*/
})
