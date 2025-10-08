// Global cart array (exported for use in other files)
export const cart = [];

// Existing: Sets up +/− button logic
export function setupQuantityButtons() {
  // Minus buttons (−) – Decrement
  document.querySelectorAll('.js-button-minus')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const input = button.nextElementSibling;
        
        if (input && input.tagName === 'INPUT' && input.type === 'number') {
          let currentValue = parseInt(input.value, 10) || 0;
          const minValue = parseInt(input.min, 10) || 0;
          const newValue = Math.max(minValue, currentValue - 1);
          input.value = newValue;
          
          input.dispatchEvent(new Event('input', { bubbles: true }));  // Triggers cart update
        }
      });
    });

  // Plus buttons (+) – Increment
  document.querySelectorAll('.js-button-plus')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const input = button.previousElementSibling;
        
        if (input && input.tagName === 'INPUT' && input.type === 'number') {
          let currentValue = parseInt(input.value, 10) || 0;
          const maxValue = parseInt(input.max, 10) || Infinity;  // Respects your max="10"
          const newValue = Math.min(maxValue, currentValue + 1);
          input.value = newValue;
          
          input.dispatchEvent(new Event('input', { bubbles: true }));  // Triggers cart update
        }
      });
    });
}

// Updated: Sets up checkbox listeners to enable/disable + handle cart directly (no dispatch)
export function setupCheckboxListeners() {
  document.querySelectorAll('.order-options .option input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        const optionDiv = checkbox.closest('.option');
        const quantityControl = optionDiv.querySelector('.quantity-control');
        const input = quantityControl ? quantityControl.querySelector('.qty-input') : null;
        
        if (quantityControl) {
          const controls = quantityControl.querySelectorAll('button, input');
          
          if (checkbox.checked) {
            // Enable and set to 1
            controls.forEach(el => el.disabled = false);
            if (input) input.value = 1;
            
            // Directly update cart (add/update)
            updateCartFromCheckbox(checkbox, input);
            console.log('Checkbox checked: Direct cart update for add');  // Debug
          } else {
            // Reset input to 0 and disable
            if (input) input.value = 0;
            controls.forEach(el => el.disabled = true);
            
            // Directly remove from cart (no input needed)
            removeItemFromCart(checkbox);
            console.log('Checkbox unchecked: Direct cart removal');  // Debug
          }
        }
      });
    });
}

// New: Helper to update cart on checkbox check (uses input value)
function updateCartFromCheckbox(checkbox, input) {
  try {
    const optionDiv = checkbox.closest('.option');
    const productSection = optionDiv.closest('.spicy-description');
    if (!productSection) {
      console.error('Error: .spicy-description not found');  // Debug
      return;
    }
    const productName = productSection.querySelector('.spicy-title').textContent;
    const size = checkbox.dataset.name;
    const newQuantity = input ? parseInt(input.value, 10) || 0 : 0;
    
    console.log(`Check update: Product="${productName}", Size="${size}", Qty=${newQuantity}`);  // Debug
    
    if (newQuantity > 0) {
      const existingItemIndex = cart.findIndex(item => 
        item.productName === productName && item.size === size
      );
      
      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity = newQuantity;
        console.log('Updated existing item on check');  // Debug
      } else {
        cart.push({
          productName,
          size,
          quantity: newQuantity
        });
        console.log('Added new item on check');  // Debug
      }
    }
    
    updateCartDisplay();
  } catch (error) {
    console.error('Error in updateCartFromCheckbox:', error);  // Debug
  }
}

// New: Helper to remove item on checkbox uncheck (direct, no input)
function removeItemFromCart(checkbox) {
  try {
    const optionDiv = checkbox.closest('.option');
    const productSection = optionDiv.closest('.spicy-description');
    if (!productSection) {
      console.error('Error: .spicy-description not found on remove');  // Debug
      return;
    }
    const productName = productSection.querySelector('.spicy-title').textContent;
    const size = checkbox.dataset.name;
    
    console.log(`Remove: Product="${productName}", Size="${size}"`);  // Debug
    
    const beforeLength = cart.length;
    cart = cart.filter(item => 
      !(item.productName === productName && item.size === size)
    );
    
    if (cart.length < beforeLength) {
      console.log('Successfully removed item from cart');  // Debug
    } else {
      console.log('No matching item found to remove');  // Debug
    }
    
    updateCartDisplay();
  } catch (error) {
    console.error('Error in removeItemFromCart:', error);  // Debug
  }
}

// Existing: Update cart from quantity input change (for buttons/typing only now)
function updateCartFromQuantityInput(input) {
  console.log('updateCartFromQuantityInput called (from input/button)');  // Debug
  
  try {
    const quantityControl = input.closest('.quantity-control');
    const optionDiv = quantityControl.closest('.option');
    const checkbox = optionDiv.querySelector('input[type="checkbox"]');
    const productSection = optionDiv.closest('.spicy-description');
    if (!productSection) {
      console.error('Error: .spicy-description not found in input update');  // Debug
      return;
    }
    const productName = productSection.querySelector('.spicy-title').textContent;
    
    const size = checkbox.dataset.name;
    const newQuantity = parseInt(input.value, 10) || 0;
    
    console.log(`Input update: Product="${productName}", Size="${size}", Qty=${newQuantity}, Checked=${checkbox.checked}`);  // Debug
    
    // Only add/update if checkbox is checked and quantity > 0
    if (checkbox.checked && newQuantity > 0) {
      const existingItemIndex = cart.findIndex(item => 
        item.productName === productName && item.size === size
      );
      
      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity = newQuantity;
        console.log('Updated existing item from input');  // Debug
      } else {
        cart.push({
          productName,
          size,
          quantity: newQuantity
        });
        console.log('Added new item from input');  // Debug
      }
    } else {
      // Remove if unchecked or quantity = 0 (for typing to 0 while checked)
      const beforeLength = cart.length;
      cart = cart.filter(item => 
        !(item.productName === productName && item.size === size)
      );
      if (cart.length < beforeLength) {
        console.log('Removed item from input update');  // Debug
      } else {
        console.log('No item to remove from input');  // Debug
      }
    }
    
    updateCartDisplay();
  } catch (error) {
    console.error('Error in updateCartFromQuantityInput:', error);  // Debug
  }
}

// Update the display (sums total items and updates .js-cart-quantity badge)
function updateCartDisplay() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalElement = document.querySelector('.js-cart-quantity');
  if (totalElement) {
    totalElement.textContent = totalItems;
    console.log(`Badge updated to: ${totalItems} (from cart length: ${cart.length})`);  // Debug
  } else {
    console.error('Error: .js-cart-quantity not found');  // Debug
  }
  
  console.log('Cart quantity updated:', totalItems, 'items | Cart:', cart);  // Debug
}

// Setup listeners for real-time quantity updates (exported for checkout.js)
export function setupCartListeners() {
  // Add 'input' listeners to all quantity inputs (for buttons/typing)
  document.querySelectorAll('.qty-input')
    .forEach((input) => {
      input.addEventListener('input', () => {
        updateCartFromQuantityInput(input);
      });
    });
  
  // Initial display (starts at 0)
  updateCartDisplay();
}
   