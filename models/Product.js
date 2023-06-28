const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
    validete(value) {
      if (value < 0) throw new Error("Value must be positive");
    },
  },
  stock: {
    type: Number,
    default: 0,
    validete(value) {
      if (value < 0) throw new Error("Value must be positive");
    },
  },
  image: {
    type: String,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
