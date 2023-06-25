require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.static("public"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

let shoppingCart = [];

const productRouter = require("./routes/productRoutes.js");
app.use(productRouter);

app.get("/cart", (req, res) => {
  res.json(shoppingCart);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
