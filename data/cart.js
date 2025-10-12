export const cart = [];

// 🔹 Helper to update cart quantity display (called from other functions)
export function updateCartQuantityDisplay() {
  let totalQuantity = 0;

  // Add up quantities for all checked options
  document.querySelectorAll('.qty-input').forEach((input) => {
    const checkbox = input.closest('.option').querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      totalQuantity += parseInt(input.value, 10) || 0;
    }
  });

  const display = document.querySelector('.js-cart-quantity');
  if (display) display.textContent = totalQuantity;
}

// 🔹 Sets up +/− button logic
export function setupQuantityButtons() {
  // Minus buttons (−)
  document.querySelectorAll('.js-button-minus').forEach((button) => {
    button.addEventListener('click', () => {
      const input = button.nextElementSibling;
      if (input && input.tagName === 'INPUT' && input.type === 'number') {
        let currentValue = parseInt(input.value, 10) || 0;
        const minValue = parseInt(input.min, 10) || 0;
        const newValue = Math.max(minValue, currentValue - 1);
        input.value = newValue;

        input.dispatchEvent(new Event('input', { bubbles: true }));
        updateCartQuantityDisplay(); // 👈 update total when minus clicked
      }
    });
  });

  // Plus buttons (+)
  document.querySelectorAll('.js-button-plus').forEach((button) => {
    button.addEventListener('click', () => {
      const input = button.previousElementSibling;
      if (input && input.tagName === 'INPUT' && input.type === 'number') {
        let currentValue = parseInt(input.value, 10) || 0;
        const maxValue = parseInt(input.max, 10) || Infinity;
        const newValue = Math.min(maxValue, currentValue + 1);
        input.value = newValue;

        input.dispatchEvent(new Event('input', { bubbles: true }));
        updateCartQuantityDisplay(); // 👈 update total when plus clicked
      }
    });
  });
}

// 🔹 Sets up checkbox listeners to enable/disable controls
export function setupCheckboxListeners() {
  document.querySelectorAll('.order-options .option input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const optionDiv = checkbox.closest('.option');
      const quantityControl = optionDiv.querySelector('.quantity-control');
      const input = quantityControl ? quantityControl.querySelector('.qty-input') : null;

      if (quantityControl) {
        const controls = quantityControl.querySelectorAll('button, input');

        if (checkbox.checked) {
          // Enable and set to 1
          controls.forEach((el) => (el.disabled = false));
          if (input) input.value = 1;
        } else {
          // Disable and reset to 0
          if (input) input.value = 0;
          controls.forEach((el) => (el.disabled = true));
        }

        updateCartQuantityDisplay(); // 👈 update whenever checkbox changes
      }
    });
  });
}

