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
            <a href="/products/${product.id}">See details</a>
          `;
          productDiv.appendChild(productElement);
        });
      });
  };

  console.log("duf")
  