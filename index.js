const express = require("express");
const fs = require("fs");

const app = express();


// ================= UI =================
app.get("/", (req, res) => {
  res.send(`
  <html>
    <head>
      <title>BLUE App with ML</title>
      <style>
        body {
          font-family: Arial;
          background:#f0f8ff;
          text-align:center;
          padding-top:100px;
        }
        .card {
          background:white;
          padding:40px;
          width:400px;
          margin:auto;
          border-radius:10px;
          box-shadow:0 4px 10px rgba(0,0,0,0.1);
        }
        h1 { color:blue; }
        button {
          padding:10px;
          margin:5px;
          background:blue;
          color:white;
          border:none;
          border-radius:5px;
          cursor:pointer;
        }
        button:hover { background:darkblue; }
        #result {
          margin-top:20px;
          font-weight:bold;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>BLUE App with ML 🚀</h1>

        <button onclick="predict()">AI Prediction</button>
        <button onclick="scale()">Scaling Advice</button>

        <p id="result">Result will appear here...</p>
      </div>

      <script>
        function predict(){
          console.log("CLICKED PREDICT");

          fetch('/predict')
            .then(res => res.text())
            .then(data => {
              console.log("Predict:", data);
              document.getElementById("result").innerText = data;
            })
            .catch(err => {
              console.error(err);
              document.getElementById("result").innerText = "Error ❌";
            });
        }

        function scale(){
          console.log("CLICKED SCALE");

          fetch('/scale-advice')
            .then(res => res.text())
            .then(data => {
              console.log("Scale:", data);
              document.getElementById("result").innerText = data;
            })
            .catch(err => {
              console.error(err);
              document.getElementById("result").innerText = "Error ❌";
            });
        }
      </script>
    </body>
  </html>
  `);
});


// ================= AI PREDICTION =================
app.get("/predict", (req, res) => {
  console.log("👉 /predict HIT");

  try {
    const data = fs.readFileSync("cloud_workload_dataset.csv", "utf8");

    // 🔥 ONLY LAST 10 ROWS (dynamic)
    const lines = data.trim().split("\n").slice(-10);

    let total = 0;
    let count = 0;

    lines.forEach(line => {
      const cols = line.split(",");
      const cpu = parseFloat(cols[3]);

      if (!isNaN(cpu)) {
        total += cpu;
        count++;
      }
    });

    let avg = total / count;

    // 🔥 Add small ML-like variation
    const predicted = avg + (Math.random() * 6 - 3);

    console.log("👉 AI AVG:", avg);
    console.log("👉 AI PREDICTED:", predicted);

    res.send("AI Predicted CPU: " + predicted.toFixed(2) + "%");

  } catch (err) {
    console.error(err);
    res.send("Prediction Error ❌");
  }
});


// ================= SCALING ADVICE =================
app.get("/scale-advice", (req, res) => {
  console.log("👉 /scale-advice HIT");

  try {
    const data = fs.readFileSync("cloud_workload_dataset.csv", "utf8");

    const lines = data.trim().split("\n").slice(-10);

    let total = 0;
    let count = 0;

    lines.forEach(line => {
      const cols = line.split(",");
      const cpu = parseFloat(cols[3]);

      if (!isNaN(cpu)) {
        total += cpu;
        count++;
      }
    });

    let avg = total / count;

    const predicted = avg + (Math.random() * 6 - 3);

    console.log("👉 SCALE VALUE:", predicted);

    let advice = "Scale DOWN ⬇️";
    if (predicted > 70) advice = "Scale UP 🚀";
    else if (predicted > 40) advice = "Maintain ⚖️";

    res.send("AI CPU: " + predicted.toFixed(2) + "% → " + advice);

  } catch (err) {
    console.error(err);
    res.send("Scaling Error ❌");
  }
});


// ================= HEALTH =================
app.get("/health", (req, res) => {
  res.send("OK");
});


// ================= SERVER =================
const PORT = 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running at http://localhost:" + PORT);
});