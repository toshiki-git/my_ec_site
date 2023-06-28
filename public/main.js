let shoppingCart = [];

window.onload = () => {
  if (sessionStorage.getItem("shoppingCart")) {
    shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart"));
  }

  if (window.location.pathname === "/") {
    loadProducts();
  }

  if (window.location.pathname === "/cart") {
    loadCart(shoppingCart);
    console.log(shoppingCart);
    document
      .getElementById("purchaseButton")
      .addEventListener("click", () => purchaseProduct(shoppingCart));
  }
};

const purchaseProduct = async (cart) => {
  try {
    // Prepare the order data
    const order = cart.map((product) => {
      return { id: product.id, quantity: product.quantity };
    });

    console.log(order);

    // Send a POST request to the server with the order data
    const response = await fetch("http://localhost:3000/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error("Failed to purchase products");
    }

    const result = await response.json();

    // Clear the shopping cart and update sessionStorage
    shoppingCart = [];
    sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

    alert(result.message);
    location.reload();
  } catch (error) {
    console.log(error.message);
  }
};

const loadProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    const products = await response.json();

    let productDiv = document.getElementById("product-list");
    products.forEach((product) => {
      let productElement = document.createElement("div");
      let quantityOptions = quantityOption(product.stock);

      productElement.innerHTML = `
  <div class="card shadow mb-4" style="width: 18rem;">
    <img class="card-img-top" src=${product.image} alt="Description of image">
    <div class="card-body">
    ${
      product.stock === 0
        ? '<div class="alert alert-danger" role="alert">SOLD OUT</div>'
        : ""
    }
      <h2 class="card-title">${product.name}</h2>
      <p class="card-text">${product.description}</p>
      <p class="card-text">Price: $${product.price}</p>
      <p class="card-text">Stock: ${product.stock}</p>
      <select id="quantity${product.id}">${quantityOptions}</select>
      <button onclick="addToCart(${
        product.id
      }, document.getElementById('quantity${
        product.id
      }').value)" class="btn btn-primary mt-2" ${
        product.stock === 0 ? "disabled" : ""
      }>Add to Cart</button>
    </div>
  </div>
  `;
      productDiv.appendChild(productElement);
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

const addToCart = async (id, quantity) => {
  let qty = Number(quantity);
  let res = await fetch(`http://localhost:3000/products/${id}`);
  const product = await res.json();

  const existingProductIndex = shoppingCart.findIndex(
    (item) => item.id === product.id
  );

  if (existingProductIndex !== -1) {
    if (shoppingCart[existingProductIndex].quantity + qty > product.stock) {
      alert("You cannot add more of this product, limited stock!");
      return;
    }
    // 既存の製品が見つかった場合、その数量を増やします
    shoppingCart[existingProductIndex].quantity += qty;
  } else {
    // 既存の製品が見つからなかった場合、新しい製品をカートに追加します
    shoppingCart.push({ ...product, quantity: qty });
  }

  sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  location.reload();
};

const loadCart = (cart) => {
  let cartDiv = document.getElementById("cart-list");
  cart.forEach((product) => {
    let quantityOptions = quantityOption(product.stock);
    let cartElement = document.createElement("div");
    cartElement.innerHTML = `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h2 class="card-title">${product.name}</h2>
        <p class="card-text">${product.description}</p>
        <p class="card-text">Price: $${product.price}</p>
        <p class="card-text">Quantity: ${product.quantity}</p>
        <select id="cartQuantity${product.id}">${quantityOptions}</select>
        <button class="btn btn-primary mt-3" onclick="changeQuantity(${product.id}, document.getElementById('cartQuantity${product.id}').value)">Change</button>
        <button class="btn btn-primary mt-3"  onclick="removeFromCart(${product.id})">Remove</button>
      </div>
    </div>
    `;
    cartDiv.appendChild(cartElement);
  });
  let totalPriceElement = document.getElementById("total-price");
  let totalPrice = calculateTotalPrice(cart);
  // toFixed(2) ensures there are two decimal places
  totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
};

const quantityOption = (stock) => {
  let quantityOptions = "";
  for (let i = 1; i <= stock; i++) {
    quantityOptions += `<option value="${i}">${i}</option>`;
  }
  return quantityOptions;
};

const calculateTotalPrice = (cart) => {
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  return totalPrice;
};

const removeFromCart = (id) => {
  const existingProductIndex = shoppingCart.findIndex((item) => item.id === id);

  if (existingProductIndex !== -1) {
    // 商品が見つかった場合、その数量をチェック
    if (shoppingCart[existingProductIndex].quantity > 1) {
      // 数量が2以上の場合、数量を1つ減らす
      shoppingCart[existingProductIndex].quantity--;
    } else {
      // 数量が1の場合、商品をカートから削除
      shoppingCart.splice(existingProductIndex, 1);
    }
  }
  sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  location.reload();
};

const changeQuantity = async (id, newQuantity) => {
  let qty = Number(newQuantity);
  const product = shoppingCart.find((item) => item.id === id);

  // もし新しい数量が在庫を超えていたら、エラーメッセージを表示する
  if (qty > product.stock) {
    alert("You cannot add more of this product, limited stock!");
    return;
  }

  const existingProductIndex = shoppingCart.findIndex((item) => item.id === id);

  if (existingProductIndex !== -1) {
    // 既存の商品が見つかった場合、その数量を新しい数量に変更する
    shoppingCart[existingProductIndex].quantity = qty;
  }

  sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  location.reload();
};
