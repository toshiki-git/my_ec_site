window.onload = () => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(products => {
        let productDiv = document.getElementById('product-list');
        products.forEach(product => {
          let productElement = document.createElement('div');
          productElement.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
            <button onclick="purchaseProduct(${product.id})">Purchase</button>
          `;
          productDiv.appendChild(productElement);
        });
      });
  };


const purchaseProduct = (productId) => {
  fetch(`http://localhost:3000/products/${productId}/purchase`, {
    method: 'POST'
  })
  .then(response => response.json())
  .then(result => {
    alert(result.message);
    location.reload();
  })
  .catch(error => {
    alert('Faild to purchase product');
  });
}