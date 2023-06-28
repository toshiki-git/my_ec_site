require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const ProductModel = require("./models/Product.js");
app.use(express.static("public"));
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//let shoppingCart = [];

const productRouter = require("./routes/productRoutes.js");
app.use(productRouter);

app.get("/cart", (req, res) => {
  res.sendFile(__dirname + "/public/cart.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
});

app.get("/delete", (req, res) => {
  res.sendFile(__dirname + "/public/delete.html");
});

app.post("/purchase", async (req, res) => {
  try {
    // Parse the order from the request body
    const order = req.body;

    // Update each product in the order
    for (const product of order) {
      const result = await ProductModel.updateOne(
        { id: product.id },
        { $inc: { stock: -product.quantity } }
      );

      if (result.nModified === 0) {
        throw new Error("Failed to purchase product");
      }
    }

    res.json({ message: "Purchase successful" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
