// ===========================
// BASE DE DATOS DE PRODUCTOS
// ===========================
const PRODUCTS = [
    {
        id: 1,
        name: 'MacBook Pro 16"',
        category: 'laptops',
        price: 2499.99,
        image: '💻',
        description: 'Laptop de alta performance con procesador M2 Pro',
        rating: 4.8,
        stock: 15,
        reviews: 128
    },
    {
        id: 2,
        name: 'iPhone 15 Pro',
        category: 'phones',
        price: 1199.99,
        image: '📱',
        description: 'Último modelo de Apple con cámara avanzada',
        rating: 4.9,
        stock: 20,
        reviews: 250
    },
    {
        id: 3,
        name: 'iPad Air',
        category: 'tablets',
        price: 599.99,
        image: '📱',
        description: 'Tablet de 11 pulgadas con pantalla Retina',
        rating: 4.7,
        stock: 12,
        reviews: 95
    },
    {
        id: 4,
        name: 'AirPods Pro',
        category: 'accesories',
        price: 249.99,
        image: '🎧',
        description: 'Auriculares inalámbricos con cancelación de ruido',
        rating: 4.8,
        stock: 50,
        reviews: 420
    },
    {
        id: 5,
        name: 'Dell XPS 13',
        category: 'laptops',
        price: 1299.99,
        image: '💻',
        description: 'Laptop ultraportátil con pantalla OLED',
        rating: 4.6,
        stock: 8,
        reviews: 87
    },
    {
        id: 6,
        name: 'Samsung Galaxy S24',
        category: 'phones',
        price: 999.99,
        image: '📱',
        description: 'Teléfono Android de última generación',
        rating: 4.7,
        stock: 25,
        reviews: 156
    },
    {
        id: 7,
        name: 'Apple Watch Series 9',
        category: 'accesories',
        price: 399.99,
        image: '⌚',
        description: 'Reloj inteligente con monitoreo de salud',
        rating: 4.8,
        stock: 30,
        reviews: 234
    },
    {
        id: 8,
        name: 'Lenovo Tab P12',
        category: 'tablets',
        price: 699.99,
        image: '📱',
        description: 'Tablet con procesador Snapdragon',
        rating: 4.5,
        stock: 10,
        reviews: 67
    }
];

// ===========================
// ESTADO DEL CARRITO
// ===========================
let cart = [];
let currentFilter = {
    category: '',
    price: '',
    search: ''
};

// ===========================
// FUNCIONES AUXILIARES
// ===========================

/**
 * Carga el carrito desde localStorage
 */
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

/**
 * Guarda el carrito en localStorage
 */
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Actualiza el contador del carrito en el header
 */
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

/**
 * Formatea el precio en formato USD
 */
function formatPrice(price) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

/**
 * Genera el HTML de una tarjeta de producto
 */
function createProductCard(product) {
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <span class="product-rating">⭐ ${product.rating}</span>
                </div>
                <button class="product-btn" onclick="openProductModal(${product.id})">Ver Detalles</button>
            </div>
        </div>
    `;
}

/**
 * Filtra los productos según los criterios actuales
 */
function getFilteredProducts() {
    return PRODUCTS.filter(product => {
        // Filtro de categoría
        if (currentFilter.category && product.category !== currentFilter.category) {
            return false;
        }

        // Filtro de precio
        if (currentFilter.price) {
            const [min, max] = currentFilter.price.split('-').map(v => parseInt(v));
            if (max === undefined) {
                if (product.price < min) return false;
            } else {
                if (product.price < min || product.price > max) return false;
            }
        }

        // Filtro de búsqueda
        if (currentFilter.search) {
            const searchLower = currentFilter.search.toLowerCase();
            return product.name.toLowerCase().includes(searchLower) ||
                   product.description.toLowerCase().includes(searchLower);
        }

        return true;
    });
}

/**
 * Renderiza la grilla de productos
 */
function renderProducts() {
    const filteredProducts = getFilteredProducts();
    const grid = document.getElementById('products-grid');
    
    if (filteredProducts.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No se encontraron productos</p>';
        return;
    }

    grid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

// ===========================
// FUNCIONES DEL MODAL
// ===========================

/**
 * Abre el modal con los detalles del producto
 */
function openProductModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-image').textContent = product.image;
    document.getElementById('modal-description').textContent = product.description;
    document.getElementById('modal-price').textContent = formatPrice(product.price);
    document.getElementById('modal-rating').textContent = `${product.rating} (${product.reviews} reviews)`;
    document.getElementById('modal-stock').textContent = product.stock;
    document.getElementById('product-quantity').value = 1;
    document.getElementById('product-quantity').max = product.stock;

    document.getElementById('modal-add-cart-btn').onclick = () => {
        const quantity = parseInt(document.getElementById('product-quantity').value);
        addToCart(product, quantity);
        document.getElementById('product-modal').classList.remove('open');
    };

    document.getElementById('product-modal').classList.add('open');
}

/**
 * Cierra el modal
 */
function closeProductModal() {
    document.getElementById('product-modal').classList.remove('open');
}

// ===========================
// FUNCIONES DEL CARRITO
// ===========================

/**
 * Agrega un producto al carrito
 */
function addToCart(product, quantity = 1) {
    if (quantity <= 0) return;

    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    saveCart();
    updateCartCount();
    renderCartItems();
    showNotification(`${product.name} agregado al carrito`);
}

/**
 * Elimina un producto del carrito
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCartItems();
}

/**
 * Actualiza la cantidad de un producto en el carrito
 */
function updateCartItemQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart();
        updateCartCount();
        renderCartItems();
    }
}

/**
 * Vacía el carrito
 */
function clearCart() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        cart = [];
        saveCart();
        updateCartCount();
        renderCartItems();
        showNotification('Carrito vaciado');
    }
}

/**
 * Calcula el total del carrito
 */
function calculateCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

/**
 * Renderiza los items del carrito
 */
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const total = calculateCartTotal();
    document.getElementById('cart-total').textContent = formatPrice(total);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="cart-empty">Tu carrito está vacío</div>';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-quantity">
                    <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        </div>
    `).join('');
}

/**
 * Abre/Cierra el carrito
 */
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');

    if (sidebar.classList.contains('open')) {
        renderCartItems();
    }
}

/**
 * Cierra el carrito
 */
function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
}

// ===========================
// FUNCIONES DE NAVEGACIÓN
// ===========================

/**
 * Muestra una sección específica
 */
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.getElementById('hero').style.display = 'none';
    document.getElementById('search-section').style.display = 'none';
    document.getElementById('products-section').style.display = 'none';
    document.getElementById('about-section').style.display = 'none';

    // Remover clase active de todos los botones
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    // Mostrar la sección seleccionada
    switch(sectionId) {
        case 'home':
            document.getElementById('hero').style.display = 'block';
            document.getElementById('home-btn').classList.add('active');
            break;
        case 'products':
            document.getElementById('search-section').style.display = 'block';
            document.getElementById('products-section').style.display = 'block';
            document.getElementById('products-btn').classList.add('active');
            renderProducts();
            break;
        case 'about':
            document.getElementById('about-section').style.display = 'block';
            document.getElementById('about-btn').classList.add('active');
            break;
    }
}

/**
 * Muestra una notificación temporal
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===========================
// EVENT LISTENERS
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Cargar carrito guardado
    loadCart();
    updateCartCount();

    // Navegación
    document.getElementById('home-btn').addEventListener('click', () => showSection('home'));
    document.getElementById('products-btn').addEventListener('click', () => showSection('products'));
    document.getElementById('about-btn').addEventListener('click', () => showSection('about'));
    document.getElementById('shop-btn').addEventListener('click', () => showSection('products'));

    // Carrito
    document.getElementById('cart-toggle').addEventListener('click', toggleCart);
    document.getElementById('cart-close').addEventListener('click', closeCart);
    document.getElementById('cart-overlay').addEventListener('click', closeCart);
    document.getElementById('clear-cart-btn').addEventListener('click', clearCart);

    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        const total = calculateCartTotal();
        alert(`Total a pagar: ${formatPrice(total)}\n\nGracias por tu compra!`);
        cart = [];
        saveCart();
        updateCartCount();
        renderCartItems();
        closeCart();
    });

    // Búsqueda y filtros
    document.getElementById('search-input').addEventListener('input', function(e) {
        currentFilter.search = e.target.value;
        renderProducts();
    });

    document.getElementById('category-filter').addEventListener('change', function(e) {
        currentFilter.category = e.target.value;
        renderProducts();
    });

    document.getElementById('price-filter').addEventListener('change', function(e) {
        currentFilter.price = e.target.value;
        renderProducts();
    });

    // Modal
    document.querySelector('.close-modal').addEventListener('click', closeProductModal);
    document.getElementById('product-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeProductModal();
        }
    });

    // Mostrar sección inicial
    showSection('home');
});

// ===========================
// FUNCIONES ADICIONALES
// ===========================

/**
 * Busca un producto por ID
 */
function getProductById(id) {
    return PRODUCTS.find(p => p.id === id);
}

/**
 * Obtiene los productos por categoría
 */
function getProductsByCategory(category) {
    return PRODUCTS.filter(p => p.category === category);
}

/**
 * Obtiene las categorías únicas
 */
function getCategories() {
    return [...new Set(PRODUCTS.map(p => p.category))];
}

/**
 * Ordena los productos
 */
function sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch(sortBy) {
        case 'price-asc':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    return sorted;
}
