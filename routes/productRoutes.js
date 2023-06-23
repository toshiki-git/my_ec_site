const express = require("express");
const app = express();
const ProductModel = require("../models/Product.js");

app.use(express.json());

app.get("/products", async (req, res) => {
  const products = await ProductModel.find({});
  res.json(products);
});

app.get("/products/:id", async (req, res) => {
  const products = await ProductModel.find({});
  const productId = Number(req.params.id);
  const product = products.find((product) => product.id === productId);

  if (!product) {
    res.status(404).send("Product not found");
  } else {
    res.json(product);
  }
});

/* app.post("/products/:id/purchase", (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find((product) => product.id === productId);

  if (!product) {
    res.status(404).send("Product not found");
  } else if (product.stock > 0) {
    product.stock -= 1;
    res.json({ message: "Product purchased!", product });
  } else {
    res.status(400).send("Product out of stock");
  }
});

app.post("/products/:id/cart", (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find((product) => product.id === productId);

  if (!product) {
    res.status(404).send("Product not found");
  } else {
    shoppingCart.push(product);
    res.json({ message: "Product added to cart!", shoppingCart });
  }
}); */

module.exports = app;
