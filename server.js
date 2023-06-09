const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'));


let products = [
    { id: 1, name: 'Product 1', description: 'This is product 1', price: 100, stock: 10 },
    { id: 2, name: 'Product 2', description: 'This is product 2', price: 200, stock: 10 },
    { id: 3, name: 'Product 3', description: 'This is product 3', price: 300, stock: 10 },
    { id: 4, name: 'Product 4', description: 'This is product 4', price: 400, stock: 10 },
    { id: 5, name: 'Product 5', description: 'This is product 5', price: 500, stock: 10 },
    { id: 6, name: 'Product 6', description: 'This is product 6', price: 600, stock: 10 },
    { id: 7, name: 'Product 7', description: 'This is product 7', price: 700, stock: 10 },
    { id: 8, name: 'Product 8', description: 'This is product 8', price: 800, stock: 10 },
    { id: 9, name: 'Product 9', description: 'This is product 9', price: 900, stock: 10 },
    { id: 10, name: 'Product 10', description: 'This is product 10', price: 1000, stock: 10 },
    { id: 11, name: 'Product 11', description: 'This is product 11', price: 1100, stock: 10 },
    { id: 12, name: 'Product 12', description: 'This is product 12', price: 1200, stock: 10 },
    { id: 13, name: 'Product 13', description: 'This is product 13', price: 1300, stock: 10 },
    { id: 14, name: 'Product 14', description: 'This is product 14', price: 1400, stock: 10 },
];


app.get('/', (req, res) => {
  res.send('Welcome to our simple e-commerce site');
});

app.get('/products', (req, res) => {
    res.json(products);
})

app.get('/products/:id', (req, res) => {
    const productId = Number(req.params.id);
    const product = products.find(product => product.id === productId);
  
    if (!product) {
      res.status(404).send('Product not found');
    } else {
      res.json(product);
    }
  });

  app.post('/products/:id/purchase', (req, res) => {
    const productId = Number(req.params.id);
    const product = products.find(product => product.id === productId);
  
    if (!product) {
      res.status(404).send('Product not found');
    } else if (product.stock > 0) {
      product.stock -= 1;
      res.json({ message: 'Product purchased!', product });
    } else {
      res.status(400).send('Product out of stock');
    }
  });
  

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
