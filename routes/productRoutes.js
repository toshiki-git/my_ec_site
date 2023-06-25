const express = require("express");
const app = express();
const ProductModel = require("../models/Product.js");

app.use(express.urlencoded({ extended: true }));

app.post("/submit", async (req, res) => {
  const { id, name, description, price, stock } = req.body;
  try {
    await addProduct(id, name, description, price, stock);
    res.send("Product saved!");
  } catch (err) {
    res.status(500).send("Error saving product!");
  }
});

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

const addProduct = async (id, name, description, price, stock) => {
  const newProduct = new ProductModel({
    id,
    name,
    description,
    price,
    stock,
  });
  try {
    const result = await newProduct.save();
    console.log("Product saved:", result);
  } catch (err) {
    console.error("Error saving product:", err);
  }
};

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
