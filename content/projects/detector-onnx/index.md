---
title: 'Number Detector (ONNX)'
summary: 'PyTorch ➝ ONNX Number Detector'
date:  2024-03-04T20:00:13Z
tags: ['goal', 'machine learning', 'pytorch', 'onnx']
---
By following this [Guide (How to Run PyTorch Models in the Browser With ONNX.js)](https://www.youtube.com/watch?v=Vs70jsRgO8S) I was able to put a model online.
Direct links in `rawhtml` did not work, being "relative-ized".

{{<rawhtml>}}
  <link rel="stylesheet" href="style.css" />

  <div id="container">
    <div class="card elevation">
      <canvas
        class="canvas elevation"
        id="canvas"
        width="280"
        height="280"
      ></canvas>

      <div class="button" id="clear-button">CLEAR</div>

      <div>
          <div id="prediction" class="prediction">?</div>
        </div>
      </div>
    </div>
  </div>

  <script src="onnx.min.js"></script>
  <script src="script.js"></script>
{{</rawhtml>}}
