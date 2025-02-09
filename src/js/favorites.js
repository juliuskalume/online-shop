class Favorites {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('favorites')) || [];
        this.lastUpdated = localStorage.getItem('favoritesLastUpdated') || new Date('2025-02-09 21:47:25').toISOString();
    }

    addItem(productId) {
        if (!this.items.includes(productId)) {
            this.items.push(productId);
            this.updateLastModified();
            this.save();
            this.updateUI();
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(id => id !== productId);
        this.updateLastModified();
        this.save();
        this.updateUI();
    }

    toggleItem(productId) {
        if (this.items.includes(productId)) {
            this.removeItem(productId);
        } else {
            this.addItem(productId);
        }
    }

    updateLastModified() {
        this.lastUpdated = new Date('2025-02-09 21:47:25').toISOString();
        localStorage.setItem('favoritesLastUpdated', this.lastUpdated);
    }

    save() {
        localStorage.setItem('favorites', JSON.stringify(this.items));
    }

    updateUI() {
        const favoritesGrid = document.getElementById('favorites-grid');
        const emptyFavorites = document.getElementById('empty-favorites');
        
        if (!favoritesGrid) return;

        if (this.items.length === 0) {
            favoritesGrid.classList.add('hidden');
            emptyFavorites?.classList.remove('hidden');
            return;
        }

        favoritesGrid.classList.remove('hidden');
        emptyFavorites?.classList.add('hidden');

        // Filter products array to get only favorited items
        const favoriteProducts = products.filter(product => 
            this.items.includes(product.id)
        );

        favoritesGrid.innerHTML = favoriteProducts.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" 
                         alt="${product.name}" 
                         onerror="this.src='https://via.placeholder.com/300x300/e2e2e2/666666?text=📱'">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-specs">
                        <span><i class="fas fa-mobile-alt"></i> ${product.specs.screen}</span>
                        <span><i class="fas fa-microchip"></i> ${product.specs.processor}</span>
                        <span><i class="fas fa-memory"></i> ${product.specs.ram}</span>
                    </div>
                    <div class="product-price">
                        <span class="price">$${product.price.toFixed(2)}</span>
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" onclick="cart.addItem(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="remove-favorite-btn" onclick="favorites.removeItem(${product.id})">
                            <i class="fas fa-heart"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Update last updated timestamp
        const lastUpdatedElement = document.getElementById('last-login');
        if (lastUpdatedElement) {
            lastUpdatedElement.textContent = new Date(this.lastUpdated).toLocaleString();
        }
    }
}

// Initialize favorites
const favorites = new Favorites();

// Update UI when page loads
document.addEventListener('DOMContentLoaded', () => {
    favorites.updateUI();
});