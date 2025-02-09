// Global Variables
const whatsappNumber = '+905364813709';
const emailAddress = 'skalmistjulius@gmail.com';

// Sample Products Data
const products = [
    {
        id: 1,
        name: "iPhone 14 Pro Max",
        price: 1099.99,
        image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
        description: "6.7-inch Super Retina XDR display, A16 Bionic chip, 48MP camera",
        specs: {
            screen: "6.7-inch OLED",
            processor: "A16 Bionic",
            ram: "6GB",
            storage: "128GB/256GB/512GB/1TB"
        }
    },
    {
        id: 2,
        name: "Samsung Galaxy S23 Ultra",
        price: 1199.99,
        image: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s23-ultra-5g-1.jpg",
        description: "6.8-inch Dynamic AMOLED, Snapdragon 8 Gen 2, 200MP camera",
        specs: {
            screen: "6.8-inch Dynamic AMOLED",
            processor: "Snapdragon 8 Gen 2",
            ram: "8GB/12GB",
            storage: "256GB/512GB/1TB"
        }
    },
    {
        id: 3,
        name: "Google Pixel 7 Pro",
        price: 899.99,
        image: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel7-pro-2.jpg",
        description: "6.7-inch LTPO OLED, Google Tensor G2, 50MP camera",
        specs: {
            screen: "6.7-inch LTPO OLED",
            processor: "Google Tensor G2",
            ram: "12GB",
            storage: "128GB/256GB/512GB"
        }
    },
    {
        id: 4,
        name: "OnePlus 11",
        price: 699.99,
        image: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg",
        description: "6.7-inch AMOLED, Snapdragon 8 Gen 2, 50MP camera",
        specs: {
            screen: "6.7-inch AMOLED",
            processor: "Snapdragon 8 Gen 2",
            ram: "8GB/16GB",
            storage: "128GB/256GB"
        }
    },
    {
        id: 5,
        name: "Xiaomi 13 Pro",
        price: 899.99,
        image: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-13-pro-black-1.jpg",
        description: "6.73-inch AMOLED, Snapdragon 8 Gen 2, 50MP Leica camera",
        specs: {
            screen: "6.73-inch AMOLED",
            processor: "Snapdragon 8 Gen 2",
            ram: "12GB",
            storage: "256GB/512GB"
        }
    },
    {
        id: 6,
        name: "Nothing Phone (2)",
        price: 599.99,
        image: "https://fdn2.gsmarena.com/vv/pics/nothing/nothing-phone2-1_.jpg",
        description: "6.7-inch OLED, Snapdragon 8+ Gen 1, Glyph Interface",
        specs: {
            screen: "6.7-inch OLED",
            processor: "Snapdragon 8+ Gen 1",
            ram: "8GB/12GB",
            storage: "128GB/256GB"
        }
    },
    {
        id: 7,
        name: "Sony Xperia 1 V",
        price: 1299.99,
        image: "https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-1-v-1.jpg",
        description: "6.5-inch 4K OLED, Snapdragon 8 Gen 2, Pro Camera System",
        specs: {
            screen: "6.5-inch 4K OLED",
            processor: "Snapdragon 8 Gen 2",
            ram: "12GB",
            storage: "256GB/512GB"
        }
    },
    {
        id: 8,
        name: "ASUS ROG Phone 7",
        price: 999.99,
        image: "https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone-7-1.jpg",
        description: "6.78-inch AMOLED, Snapdragon 8 Gen 2, Gaming Features",
        specs: {
            screen: "6.78-inch AMOLED",
            processor: "Snapdragon 8 Gen 2",
            ram: "12GB/16GB",
            storage: "256GB/512GB"
        }
    },
    {
        id: 9,
        name: "Motorola Edge 40 Pro",
        price: 799.99,
        image: "https://fdn2.gsmarena.com/vv/pics/motorola/motorola-edge-40-pro-1.jpg",
        description: "6.67-inch OLED, Snapdragon 8 Gen 2, 125W charging",
        specs: {
            screen: "6.67-inch OLED",
            processor: "Snapdragon 8 Gen 2",
            ram: "12GB",
            storage: "256GB/512GB"
        }
    },
    {
        id: 10,
        name: "vivo X90 Pro+",
        price: 899.99,
        image: "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x90-pro-plus-1.jpg",
        description: "6.78-inch AMOLED, Snapdragon 8 Gen 2, Zeiss Optics",
        specs: {
            screen: "6.78-inch AMOLED",
            processor: "Snapdragon 8 Gen 2",
            ram: "12GB",
            storage: "256GB/512GB"
        }
    },
    {
        id: 11,
        name: "iPhone X",
        price: 499.99,
        image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg",
        description: "5.8-inch Super Retina OLED, A11 Bionic chip, Dual 12MP camera",
        specs: {
            screen: "5.8-inch OLED",
            processor: "A11 Bionic",
            ram: "3GB",
            storage: "64GB/256GB"
          }
    }
];

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
    loadCart();
    loadFavorites();
});

// Mobile Menu Toggle
function setupEventListeners() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Contact Form Submission
    const contactForm = document.getElementById('inquiry-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

// Load Products
function loadProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <p class="description">${product.description}</p>
            <div class="product-actions">
                <button onclick="addToCart(${product.id})" class="add-to-cart-btn">
                    Add to Cart
                </button>
                <button onclick="addToFavorites(${product.id})" class="favorite-btn">
                    <i class="fas fa-heart"></i>
                </button>
                <button onclick="contactViaWhatsApp(${product.id})" class="whatsapp-btn">
                    <i class="fab fa-whatsapp"></i> Buy via WhatsApp
                </button>
            </div>
        </div>
    `).join('');
}

// Shopping Cart Functions
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart!');
        updateCartCount();
    }
}

function loadCart() {
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartIcon = document.querySelector('.fa-shopping-cart');
    if (cartIcon) {
        cartIcon.setAttribute('data-count', cartCount);
    }
}

// Favorites Functions
function addToFavorites(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(productId)) {
        favorites.push(productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Product added to favorites!');
    } else {
        favorites = favorites.filter(id => id !== productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Product removed from favorites!');
    }
    updateFavoritesCount();
}

function loadFavorites() {
    updateFavoritesCount();
}

function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favIcon = document.querySelector('.fa-heart');
    if (favIcon) {
        favIcon.setAttribute('data-count', favorites.length);
    }
}

// WhatsApp Integration
function contactViaWhatsApp(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const message = encodeURIComponent(
            `Hi, I'm interested in buying ${product.name} for $${product.price}. Can you provide more information?`
        );
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    }
}

// Contact Form Handler
function handleContactFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // In a real application, you would send this to a server
    // For now, we'll just open the default email client
    const mailtoLink = `mailto:${emailAddress}?subject=Inquiry from ${name}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${name}%0D%0AEmail: ${email}`;
    window.location.href = mailtoLink;
    
    e.target.reset();
    alert('Thank you for your message! We will get back to you soon.');
}

    // Add to src/js/main.js
function initializeProductFilters() {
    const searchInput = document.getElementById('search-products');
    const sortSelect = document.getElementById('sort-products');

    searchInput?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterProducts(searchTerm);
    });

    sortSelect?.addEventListener('change', (e) => {
        sortProducts(e.target.value);
    });
}

function filterProducts(searchTerm) {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.product-description').textContent.toLowerCase();
        const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
        card.style.display = isVisible ? 'block' : 'none';
    });
}

function sortProducts(sortBy) {
    const productsGrid = document.querySelector('.products-grid');
    const productCards = Array.from(productsGrid.children);

    productCards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
        const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
        const nameA = a.querySelector('h3').textContent;
        const nameB = b.querySelector('h3').textContent;

        switch(sortBy) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'name':
                return nameA.localeCompare(nameB);
            default:
                return 0;
        }
    });

    productsGrid.innerHTML = '';
    productCards.forEach(card => productsGrid.appendChild(card));
}

// Initialize filters when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProductFilters();
});