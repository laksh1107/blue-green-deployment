const express = require("express");
const app = express();

// Updated order lifecycle (Upgraded version)
const orders = {
  101: "Order received 🍕",
  102: "Order preparing 👨‍🍳",
  103: "Out for Delivery 🚚",
  104: "Delivered ✅"
};

// Home route
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Food Order Service - RED</title>
        <style>
          body {
            font-family: Arial;
            background-color: #fff5f5;
            text-align: center;
            padding-top: 100px;
          }
          .card {
            background: white;
            padding: 40px;
            width: 400px;
            margin: auto;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: red;
          }
          input {
            padding: 8px;
            width: 200px;
            margin-bottom: 10px;
          }
          button {
            padding: 10px 20px;
            background-color: red;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          button:hover {
            background-color: darkred;
          }
          #result {
            margin-top: 15px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Food Order Service v2 (RED)</h1>
          <p>Upgraded Version Running Successfully 🚀</p>

          <input type="text" id="orderId" placeholder="Enter Order ID">
          <br>
          <button onclick="checkOrder()">Check Order</button>

          <div id="result"></div>
        </div>

        <script>
          function checkOrder() {
            const id = document.getElementById("orderId").value;

            fetch('/order/' + id)
              .then(response => {
                if (!response.ok) {
                  throw new Error("Order not found ❌");
                }
                return response.text();
              })
              .then(data => {
                document.getElementById("result").innerText = data;
              })
              .catch(error => {
                document.getElementById("result").innerText = error.message;
              });
          }
        </script>
      </body>
    </html>
  `);
});

// Order API
app.get("/order/:id", (req, res) => {
  const status = orders[req.params.id];
  if (!status) {
    return res.status(404).send("Order not found ❌");
  }
  res.send(status);
});

// Health route (important for ECS)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(3000, () => {
  console.log("RED version running on port 3000");
});
