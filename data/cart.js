export let cart = JSON.parse(localStorage.getItem('cartData')) || [];

export function saveCart() {
  localStorage.setItem('cartData', JSON.stringify(cart));
}

export function getTotalQuantity() {
  return cart.reduce((total, item) => total + (item.quantity || 0), 0);
}

export function updateCartQuantityDisplay() {
  const display = document.querySelector('.js-cart-quantity');
  if (display) {
    const quantity = getTotalQuantity() || 0;
    display.textContent = quantity;
  }
}

export function setupQuantityButtons() {
  document.querySelectorAll('.js-button-minus').forEach((button) => {
    button.addEventListener('click', () => {
      const input = button.nextElementSibling;
      if (input && input.type === 'number') {
        const min = parseInt(input.min, 10) || 0;
        input.value = Math.max(min, parseInt(input.value, 10) - 1 || 0);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        updateCartQuantityDisplay();
      }
    });
  });

  document.querySelectorAll('.js-button-plus').forEach((button) => {
    button.addEventListener('click', () => {
      const input = button.previousElementSibling;
      if (input && input.type === 'number') {
        const max = parseInt(input.max, 10) || Infinity;
        input.value = Math.min(max, parseInt(input.value, 10) + 1 || 1);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        updateCartQuantityDisplay();
      }
    });
  });
}

export function setupCheckboxListeners() {
  document.querySelectorAll('.order-options .option input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const optionDiv = checkbox.closest('.option');
      const quantityControl = optionDiv.querySelector('.quantity-control');
      const input = quantityControl?.querySelector('.qty-input');

      if (quantityControl) {
        const controls = quantityControl.querySelectorAll('button, input');
        if (checkbox.checked) {
          controls.forEach((el) => (el.disabled = false));
          if (input) input.value = 1;
        } else {
          if (input) input.value = 0;
          controls.forEach((el) => (el.disabled = true));
        }
      }

      updateCartQuantityDisplay();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartQuantityDisplay();
});
