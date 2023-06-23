window.onload = () => {
  loadProducts();
  loadCart();
}

const purchaseProduct = (productId) => {
  fetch(`http://localhost:3000/products/${productId}/purchase`, {
    method: 'POST'
  })
  .then(res => res.json())
  .then(result => {
    alert(result.message);
    location.reload();
  })
  .catch(error => {
    alert('Faild to purchase product');
  });
}

const loadProducts = () => {
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
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productDiv.appendChild(productElement);
      });
    });
}

const loadCart = () => {
  fetch('http://localhost:3000/cart')
    .then(res => res.json())
    .then(cart => {
      let cartDiv = document.getElementById('cart-list');
      cart.forEach(product => {
        productElement.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
      `;
      cartDiv.appendChild(productElement);
      });
    });
}



const addToCart = (productId) => {
  fetch(`http://localhost:3000/products/${productId}/cart`, {
    method: 'POST'
  })
  .then(res => res.json())
  .then(result => {
    alert(result.message);
    location.reload();
  })
  .catch(error => {
    alert('Failed to add product to cart');
  });
}