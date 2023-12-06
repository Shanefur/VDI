// script.js

// Function to initialize the script
function initializeScript() {
  var cartMenu = document.getElementById("cart-menu-container");
  var closeButton = document.getElementById("close-cart-button");
  var clearCartButton = document.getElementById("clear-cart-button");

  // Add click event listeners
  document.getElementById("cart-menu").addEventListener("click", toggleCart);
  document.body.addEventListener("click", closeCartMenuOutsideClick);
  closeButton.addEventListener("click", closeCart);
  clearCartButton.addEventListener("click", clearCart);

  // Function to toggle the cart menu
  function toggleCart(event) {
    event.stopPropagation(); // Prevents the body click event from firing
    cartMenu.classList.toggle("show-cart-menu");
  }

  // Function to close the cart menu when clicking anywhere else on the page
  function closeCartMenuOutsideClick(event) {
    if (!cartMenu.contains(event.target) && !event.target.matches("#cart-menu")) {
      cartMenu.classList.remove("show-cart-menu");
    }
  }

  // Function to close the cart menu when the close button is clicked
  function closeCart() {
    cartMenu.classList.remove("show-cart-menu");
  }

  // Function to clear the entire cart
  function clearCart() {
    var cartMenuContent = document.querySelector(".cart-menu-content");
    cartMenuContent.innerHTML = ""; // Remove all cart items

    // Update the cart badge count
    var cartBadge = document.querySelector(".cart-badge");
    cartBadge.innerText = "0";

    // Close the cart menu
    cartMenu.classList.remove("show-cart-menu");
  }
}

// Execute the initialization function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeScript);

// Function to add an item to the cart
function addToCart(id, name, price, image) {
  // Your add to cart logic here
  var cartBadge = document.querySelector(".cart-badge");
  var currentCount = parseInt(cartBadge.innerText);
  cartBadge.innerText = currentCount + 1;

  // Check if the item is already in the cart
  var existingCartItem = document.querySelector(`.cart-item[data-id="${id}"]`);
  if (existingCartItem) {
    // Item already exists, update quantity
    var quantityElement = existingCartItem.querySelector(".quantity");
    var currentQuantity = parseInt(quantityElement.innerText);
    quantityElement.innerText = currentQuantity + 1;
  } else {
    // Item doesn't exist, create a new cart item element
    var cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.setAttribute("data-id", id);
    cartItem.innerHTML = `
      <img src="${image}" alt="${name}" class="item-image">
      <div class="item-details">
        <p>${name}</p>
        <p>$${price}</p>
        <p class="quantity">1</p>
      </div>
      <button class="remove-item-button" onclick="removeCartItem(this)">Remove</button>
    `;

    // Add the cart item to the cart menu
    var cartMenuContent = document.querySelector(".cart-menu-content");
    cartMenuContent.appendChild(cartItem);
  }
}

// Function to remove a cart item
function removeCartItem(button) {
  // Your remove item logic here
  var cartItem = button.parentElement;
  var quantityElement = cartItem.querySelector(".quantity");
  var currentQuantity = parseInt(quantityElement.innerText);

  if (currentQuantity > 1) {
    // Decrease quantity if more than 1
    quantityElement.innerText = currentQuantity - 1;
  } else {
    // Remove the entire cart item if quantity is 1
    cartItem.remove();

    // Update the cart badge count
    var cartBadge = document.querySelector(".cart-badge");
    var currentCount = parseInt(cartBadge.innerText);
    cartBadge.innerText = currentCount - 1;
  }
}

