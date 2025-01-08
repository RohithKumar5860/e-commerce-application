// Sample Products Data
const products = [
  {
    id: 1,
    name: "Smartphone",
    price: 269.99,
    image: "images/samsung.png",
    description: "A high-quality smartphone with a sleek design and powerful features."
  },
  {
    id: 2,
    name: "Headphones",
    price: 69.99,
    image: "images/headphone.webp",
    description: "Noise-cancelling headphones for an immersive sound experience."
  },
  {
    id: 3,
    name: "Laptop",
    price: 699.99,
    image: "images/book4.jpg",
    description: "A lightweight laptop with excellent performance for all your needs."
  },
  {
    id: 4,
    name: "Smartwatch",
    price: 99.99,
    image: "images/watch.jpg",
    description: "Stay connected and track your fitness with this stylish smartwatch."
  },
  {
    id: 5,
    name: "AMD Custom PC Build",
    price: 999.99,
    image: "images/amd.jpg",
    description: "a motherboard, a CPU, a GPU, system memory, a hard drive or SSD (solid state drives), a power supply unit (PSU) and a case."
  },
  {
    id: 6,
    name: "PS 4",
    price: 1699.99,
    image: "images/ps4.jpg",
    description: "The PlayStation 4 serves as a versatile entertainment hub. Primarily, it functions as a gaming console that supports a vast library of games across various genres. "
  },
  {
    id: 7,
    name: "chip set",
    price: 2699.99,
    image: "images/chip.png",
    description: "The chip set is mainly used for the updationg the pc or laptop. The chip set is placed to increase the speed of the computer. The chip set is mainly used to do the multiple process at the same time and multi tasking."
  },
  {
    id: 8,
    name: "Cooling Fan",
    price: 299.99,
    image: "images/cooling fan.jpg",
    description: "The cooling fan is used in the high speed computers to kep the system stable and produce less heat. The cooling fan is up to the processor to kep it cool"
  },
  {
    id: 9,
    name: "Graphic Card",
    price: 1299.99,
    image: "images/graphiccard.png",
    description: "The graphic card in the computer used to improve the performance of the system. The graphic card improve the graphics in the games and the editing to improve the user experiance"
  },
  {
    id: 10,
    name: "SSD",
    price: 199.99,
    image: "images/ssd.jpg",
    description: "The SSD in the computer used to improve the performance of the system. SSD used to increase the performance in games and the editing to improve the user experiance"
  },
  // Add more products as needed
];

// Initialize Cart from Local Storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update Cart Count in Navbar
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Save Cart to Local Storage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Add to Cart Function
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    saveCart();
    alert(`${product.name} has been added to your cart.`);
  }
}

// Remove from Cart Function
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
}

// Render Products on Products Page
function renderProducts() {
  const productGrid = document.getElementById('product-grid');
  if (productGrid) {
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button class="btn" onclick="location.href='product.html?id=${product.id}'">View Details</button>
      `;
      productGrid.appendChild(productCard);
    });
  }
}

// Render Product Details on Product Page
function renderProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get('id'));
  const product = products.find(p => p.id === productId);
  const productDetail = document.getElementById('product-detail');

  if (productDetail && product) {
    productDetail.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="details">
        <h2>${product.name}</h2>
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  }
}

// Render Cart on Cart Page
function renderCart() {
  const cartContainer = document.getElementById('cart-container');
  const cartSummary = document.getElementById('cart-summary');

  if (cartContainer && cartSummary) {
    cartContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
      cartSummary.innerHTML = '';
      return;
    }

    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
        <button class="btn" onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartContainer.appendChild(cartItem);
      total += item.price;
    });

    cartSummary.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
  }
}

// Initialize Product Detail Page
if (document.getElementById('product-detail')) {
  renderProductDetail();
}

// Initialize Products Page
if (document.getElementById('product-grid')) {
  renderProducts();
}

// Initialize Cart Page
if (document.getElementById('cart-container')) {
  renderCart();
}

// Update Cart Count on Page Load
document.addEventListener('DOMContentLoaded', updateCartCount);

// Proceed to Checkout (Placeholder)
if (document.getElementById('checkout-btn')) {
  document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Checkout functionality is not implemented yet.');
  });
}
