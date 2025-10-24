let cart = JSON.parse(localStorage.getItem("cartData")) || [];
import { products } from "../data/products.js";

let cartSummaryHTML = "";

if (cart.length === 0) {
  cartSummaryHTML = `
    <div class="empty-cart">
      <p>Your cart is empty.</p>
      <a href="checkout.html" class="back-to-shop">Go back to shop</a>
    </div>
  `;
} else {
  cart.forEach((cartItem, index) => {
    const productName = cartItem.productName || "Unknown Product";
    const variety = cartItem.variety || "N/A";
    const price = parseFloat(cartItem.price) || 0;
    const quantity = parseInt(cartItem.quantity) || 0;

    const matchingProduct = products.find(
      (product) => product.name === productName
    );

    if (matchingProduct) {
      const totalPrice = price * quantity;

      cartSummaryHTML += `
        <div class="cart-item-container">
          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}" alt="${matchingProduct.name}">
            <div class="cart-item-details">
              <div class="product-name">${matchingProduct.name}</div>
              <div class="product-variety">${variety} — ₱${price}</div>
              <div class="product-quantity">
                <label>Quantity:</label>
                <span class="quantity-label">${quantity}</span>
              </div>
              <div class="product-total">
                <strong>Total:</strong> ₱${totalPrice.toLocaleString()}</strong>
              </div>
            </div>
          </div>

          <div class="delivery-date-selector">
            <label for="delivery-date-${index}">Delivery date:</label>
            <input 
              type="date" 
              id="delivery-date-${index}" 
              name="delivery-date" 
              min="${new Date().toISOString().split('T')[0]}"
            >

            <div class="cart-item-actions">
              <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
          </div>
        </div>
      `;
    }
  });
}

document.querySelector(".js-cart-summary").innerHTML = cartSummaryHTML;


document.querySelectorAll(".delete-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const index = parseInt(e.target.dataset.index);
    cart.splice(index, 1);
    localStorage.setItem("cartData", JSON.stringify(cart));
    location.reload();
  });
});


function renderPaymentSummary() {
  const paymentSummary = document.querySelector(".js-payment-summary");

  if (!paymentSummary) return;


  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.quantity) || 0;
    return sum + price * qty;
  }, 0);

  const itemCount = cart.reduce((sum, item) => {
    const qty = parseInt(item.quantity) || 0;
    return sum + qty;
  }, 0);

 
  const deliveryFee = cart.length > 0 ? 150 : 0;
  const total = subtotal + deliveryFee;

  console.log({ subtotal, deliveryFee, total });

  paymentSummary.innerHTML = `
    <h2>Payment Summary</h2>
    <div class="payment-item">
      <span>Subtotal (${itemCount} ${itemCount > 1 ? "items" : "item"})</span>
      <span>₱${subtotal.toFixed(2)}</span>
    </div>
  
    <div class="payment-item">
      <span>Delivery Fee</span>
      <span>₱${deliveryFee.toFixed(2)}</span>
    </div>
    <div class="payment-total">
      <span>Total</span>
      <span>₱${total.toFixed(2)}</span>
    </div>
    <button class="place-order-btn">Place Order</button>
  `;


paymentSummary
  .querySelector(".place-order-btn")
  .addEventListener("click", () => {
    if (cart.length === 0) {
      alert("⚠️ Your cart is empty. Please add items before placing an order.");
      return;
    }

    alert("✅ Order placed successfully!");
    localStorage.removeItem("cartData");
    location.href = "checkout.html";
  });

}

renderPaymentSummary();



