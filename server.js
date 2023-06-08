const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'));


let products = [
    { id: 1, name: 'Product 1', description: 'This is product 1', price: 100 },
    { id: 2, name: 'Product 2', description: 'This is product 2', price: 200 },
    // 他の製品もここに追加することができます。
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
