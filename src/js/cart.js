class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.shippingCost = 10.00;
        this.taxRate = 0.10; // 10% tax
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ ...product, quantity });
        }
        this.saveCart();
        this.updateUI();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateUI();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeItem(productId);
            }
        }
        this.saveCart();
        this.updateUI();
    }

    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getTax() {
        return this.getSubtotal() * this.taxRate;
    }

    getTotal() {
        return this.getSubtotal() + this.getTax() + this.shippingCost;
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateUI();
    }

    updateUI() {
        const cartItems = document.querySelector('.cart-items');
        const subtotalEl = document.getElementById('subtotal');
        const shippingEl = document.getElementById('shipping');
        const taxEl = document.getElementById('tax');
        const totalEl = document.getElementById('total');

        if (cartItems) {
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-btn" onclick="cart.removeItem(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }

        if (subtotalEl) subtotalEl.textContent = `$${this.getSubtotal().toFixed(2)}`;
        if (shippingEl) shippingEl.textContent = `$${this.shippingCost.toFixed(2)}`;
        if (taxEl) taxEl.textContent = `$${this.getTax().toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${this.getTotal().toFixed(2)}`;

        // Update cart count in header
        const cartCount = document.querySelector('.fa-shopping-cart');
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.setAttribute('data-count', totalItems);
        }
    }
}

// Initialize cart
const cart = new Cart();

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    cart.updateUI();

    // WhatsApp Checkout Button
    const whatsappCheckoutBtn = document.getElementById('whatsapp-checkout-btn');
    whatsappCheckoutBtn?.addEventListener('click', () => {
        const message = encodeURIComponent(
            `Hi, I would like to purchase the following items:\n\n${cart.items.map(item => 
                `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`
            ).join('\n')}\n\nTotal: $${cart.getTotal().toFixed(2)}`
        );
        window.open(`https://wa.me/905364813709?text=${message}`, '_blank');
    });

    // Regular Checkout Button
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn?.addEventListener('click', () => {
        if (!auth.isAuthenticated) {
            alert('Please login to proceed with checkout');
            return;
        }
        
        // Here you would typically integrate with a payment gateway
        alert('This would typically integrate with a payment gateway. For now, please use WhatsApp checkout.');
    });
});