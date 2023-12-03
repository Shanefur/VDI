function addToCart(id, name, price) {
  // Retrieve existing cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Check if the item is already in the cart
  let existingItem = cartItems.find((item) => item.id === id);

  if (existingItem) {
    // If the item is already in the cart, update the quantity
    existingItem.quantity += 1;
  } else {
    // If the item is not in the cart, add it
    cartItems.push({
      id: id,
      name: name,
      price: price,
      quantity: 1,
    });
  }

  // Save the updated cart items to localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Update the cart display
  updateCartDisplay();
}

function updateCartDisplay() {
  // Retrieve cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Update the cart section HTML
  let cartItemsHtml = "";

  cartItems.forEach((item) => {
    cartItemsHtml += `<div class="cart-item" data-id="${item.id}" data-name="${
      item.name
    }" data-price="${item.price}" data-quantity="${item.quantity}">
                            <img src="product${item.id}.jpg" alt="${item.name}">
                            <div class="cart-item-info">
                                <h3>${item.name}</h3>
                                <p>$${item.price.toFixed(2)}</p>
                                <p>Quantity: ${item.quantity}</p>
                                <div class="quantity-buttons">
                                    <button onclick="updateQuantity(${
                                      item.id
                                    }, -1)">-</button>
                                    <button onclick="updateQuantity(${
                                      item.id
                                    }, 1)">+</button>
                                </div>
                            </div>
                        </div>`;
  });

  // Display clear cart button
  if (cartItems.length > 0) {
    cartItemsHtml += `<button class="clear-cart-button" onclick="clearCart()">Clear Cart</button>`;
  }

  document.getElementById("cartSection").innerHTML = cartItemsHtml;
}

function updateQuantity(id, change) {
  // Retrieve cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Find the item in the cart
  let existingItem = cartItems.find((item) => item.id === id);

  if (existingItem) {
    // Update the quantity
    existingItem.quantity += change;

    // Ensure the quantity is at least 1
    existingItem.quantity = Math.max(existingItem.quantity, 1);

    // Save the updated cart items to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Update the cart display
    updateCartDisplay();
  }
}

function clearCart() {
  // Clear cart items in localStorage
  localStorage.removeItem("cartItems");

  // Update the cart display
  updateCartDisplay();
}

// Initial cart display on page load
updateCartDisplay();

function showSignupForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
}

function login() {
    // Basic client-side validation
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // You would typically send this data to the server for authentication
    console.log('Sending login request with username:', username, 'and password:', password);

    // For demonstration purposes, redirect to home page after login
    alert('Login successful! Redirecting to home page...');
    window.location.href = 'index.html'; // Replace with the actual home page URL
    return false; // Prevent form submission (you may remove this line in a real scenario)
}

function signup() {
    // Basic client-side validation
    var newUsername = document.getElementById('newUsername').value;
    var newPassword = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    // Additional validation, e.g., checking if passwords match
    if (newPassword !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return false;
    }

    // You would typically send this data to the server for user registration
    console.log('Sending signup request with username:', newUsername, 'and password:', newPassword);

    // For demonstration purposes, redirect to home page after signup
    alert('Sign up successful! Redirecting to home page...');
    window.location.href = 'index.html'; // Replace with the actual home page URL
    return false; // Prevent form submission (you may remove this line in a real scenario)
}