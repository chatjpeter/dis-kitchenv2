import { products } from '../data/products.js';
import {
  setupQuantityButtons,
  setupCheckboxListeners,
  updateCartQuantityDisplay,
  cart
} from '../data/cart.js';

let checkOutHTML = '';

products.forEach((product, index) => {
  const barkadaCheckboxId = `barkada-${index}`;
  const familyCheckboxId = `family-${index}`;
  const barkadaQtyId = `barkada-qty-${index}`;
  const familyQtyId = `family-qty-${index}`;
  const addToCartId = `add-to-cart-${index}`;

  checkOutHTML += `
    <div class="spicy-section">
      <img src="${product.image}" alt="${product.name}" class="spicy-picture" data-aos="zoom-in" data-aos-delay="1000">
    </div>

    <div class="spicy-description" data-aos="zoom-in" data-aos-delay="1000">
      <h1 class="spicy-title">${product.name}</h1>
      <img src="../images/ratings/rating-50.png" alt="Rating" class="rating">
      <h2>₱320 – Barkada Size (35pcs)</h2>
      <h2>₱600 – Family Size (90pcs)</h2>

      <div class="order-options">
        <div class="option">
          <input type="checkbox" id="${barkadaCheckboxId}" data-name="Barkada" data-price="320">
          <label for="${barkadaCheckboxId}">Barkada Size</label>
          <div class="quantity-control">
            <button class="qty-btn minus js-button-minus" disabled>−</button>
            <input type="number" id="${barkadaQtyId}" min="0" value="0" max="10" class="qty-input" disabled>
            <button class="qty-btn plus js-button-plus" disabled>+</button>
          </div>
        </div>

        <div class="option">
          <input type="checkbox" id="${familyCheckboxId}" data-name="Family" data-price="600">
          <label for="${familyCheckboxId}">Family Size</label>
          <div class="quantity-control">
            <button class="qty-btn minus js-button-minus" disabled>−</button>
            <input type="number" id="${familyQtyId}" min="0" max="10" value="0" class="qty-input" disabled>
            <button class="qty-btn plus js-button-plus" disabled>+</button>
          </div>
        </div>

        <button id="${addToCartId}" class="order-btn js-add-to-cart" data-product-name="${product.name}">
          Add to Cart
        </button>
      </div>
    </div>
  `;
});

document.querySelector('.js-product-section').innerHTML = checkOutHTML;

// ✅ Setup buttons and checkboxes
setupCheckboxListeners();
setupQuantityButtons();

// ✅ Listen for manual typing in number inputs
document.querySelectorAll('.qty-input').forEach((input) => {
  input.addEventListener('input', updateCartQuantityDisplay);
});

// 🛒 Add to Cart button logic (optional if you still need it)
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productName = button.dataset.productName;
    console.log(productName);

    let matchingItem = cart.find((item) => item.productName === productName);
    if (matchingItem) {
      matchingItem.quantity++;
    } else {
      cart.push({ productName: productName, quantity: 1 });
    }

    updateCartQuantityDisplay(); // ensure cart updates visually too
    console.log(cart);
  });
});

// ✅ Initialize AOS after DOM content
AOS.init({ duration: 1000, once: true });
AOS.refresh();
