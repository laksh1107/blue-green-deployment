const express = require("express");
const app = express();

// Sample order data
const orders = {
  101: "Order received ",
  102: "Preparing food "
};

// Home route
// Home route
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Food Order Service - BLUE</title>
        <style>
          body {
            font-family: Arial;
            background-color: #f4f6f9;
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
            color: blue;
          }
          input {
            padding: 8px;
            width: 200px;
            margin-bottom: 10px;
          }
          button {
            padding: 10px 20px;
            background-color: blue;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          button:hover {
            background-color: darkblue;
          }
          #result {
            margin-top: 15px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Food Order Service v1 (BLUE)</h1>
          <p>Enter your Order ID</p>
          
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



// Order status route
app.get("/order/:id", (req, res) => {
  const status = orders[req.params.id];
  if (!status) {
    return res.status(404).send("Order not found ❌");
  }
  res.send(status);
});

// Health check route (important for ECS)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(3000, () => {
  console.log("BLUE version running on port 3000");
});
