const express = require('express');
const app = express();
const port = 3000;


product = {
    id: 1,
    name: "pen",
    price: 100
}
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/products', (req, res) => {
    res.send(product);
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
