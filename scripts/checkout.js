import { products } from '../data/products.js';
import { setupQuantityButtons, setupCheckboxListeners, setupCartListeners } from '../data/cart.js';  // Added setupCartListeners to import

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

        <button id="${addToCartId}" class="order-btn">Add to Cart</button>
      </div>
    </div>
  `;
});

document.querySelector('.js-product-section').innerHTML = checkOutHTML;

// Setup functions (call after HTML is generated)
setupCheckboxListeners();  // Handles enable/disable + dispatches for cart
setupQuantityButtons();    // Handles +/− clicks
setupCartListeners();      // New: Real-time quantity counter (updates .js-cart-quantity)

// Initialize AOS AFTER the content is added
AOS.init({
  duration: 1000,
  once: true,
});

// Tell AOS to refresh for new elements
AOS.refresh();
