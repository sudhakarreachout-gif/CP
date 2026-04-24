import './style.css'
import { animate, scroll, stagger, inView } from "motion"
import * as THREE from 'three'

// State Management
let cart = [];

// Navbar Scroll Effect
const navbar = document.querySelector('#navbar');
if (navbar) {
  scroll(({ y }) => {
    if (y.current > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Animations
function initAnimations() {
  animate(
    "#hero .fade-up",
    { opacity: [0, 1], y: [30, 0] },
    { duration: 0.8, easing: [0.17, 0.55, 0.55, 1], delay: stagger(0.1) }
  );

  inView(".fade-up", (info) => {
    if (info.target.closest('#hero')) return;
    animate(
      info.target,
      { opacity: [0, 1], y: [30, 0] },
      { duration: 0.8, easing: [0.17, 0.55, 0.55, 1] }
    );
  }, { margin: "0px 0px -50px 0px" });
}

// Product Data (₹ Indian Rupees)
const products = [
  { id: 1, name: 'Eco-Friendly Chew Toy', price: 1249, category: 'Dog', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Premium Salmon Bites', price: 1550, category: 'Cat', image: '/premium_pet_food_bag.png' },
  { id: 3, name: 'Nordic Wool Pet Bed', price: 6999, category: 'Accessories', image: 'https://images.unsplash.com/photo-1567113463300-102550d2497a?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: 'Bamboo Grooming Brush', price: 999, category: 'Eco', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800' },
  { id: 5, name: 'Organic Hemp Leash', price: 1899, category: 'Dog', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800' },
  { id: 6, name: 'Smart Cat Laser Toy', price: 2450, category: 'Cat', image: 'https://images.unsplash.com/photo-1548546738-8509cb246ed3?auto=format&fit=crop&q=80&w=800' },
  { id: 7, name: 'Vet-Approved Dental Sticks', price: 750, category: 'Dog', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800' },
  { id: 8, name: 'Silicone Travel Bowl', price: 499, category: 'Accessories', image: 'https://images.unsplash.com/photo-1535268647677-5aa93e1afdf4?auto=format&fit=crop&q=80&w=800' },
  { id: 9, name: 'Probiotic Meal Topper', price: 1299, category: 'Cat', image: 'https://images.unsplash.com/photo-1591768793355-74d7c5269784?auto=format&fit=crop&q=80&w=800' },
  { id: 10, name: 'Heavy-Duty Ball Launcher', price: 3200, category: 'Dog', image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800' },
  { id: 11, name: 'Calming Essential Oil Mist', price: 890, category: 'Eco', image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=800' },
  { id: 12, name: 'Automatic Water Fountain', price: 4500, category: 'Accessories', image: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=800' },
];

function renderProducts() {
  const productGrid = document.querySelector('#product-grid');
  if (!productGrid) return;
  
  productGrid.innerHTML = products.map(product => `
    <div class="product-card fade-up" data-id="${product.id}">
      ${product.id % 4 === 0 ? '<span class="sub-badge">Subscribe & Save 10%</span>' : ''}
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <span class="hero-tagline" style="font-size: 0.7rem;">${product.category}</span>
        <h3>${product.name}</h3>
        <p class="product-price">₹${product.price.toLocaleString('en-IN')}</p>
        <button class="btn btn-primary add-to-cart" data-id="${product.id}" style="width: 100%;">Add to Cart</button>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', handleTilt);
    card.addEventListener('mouseleave', resetTilt);
  });

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      addToCart(id);
    });
  });
}

function handleTilt(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = (y - centerY) / 15;
  const rotateY = (centerX - x) / 15;
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
}

function resetTilt(e) {
  e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
}

// Cart Logic
const cartBtn = document.querySelector('#cart-btn');
const cartDrawer = document.querySelector('#cart-drawer');
const cartOverlay = document.querySelector('#cart-overlay');
const closeCart = document.querySelector('#close-cart');
const cartItemsContainer = document.querySelector('#cart-items');
const cartTotalValue = document.querySelector('#cart-total-value');

function toggleCart() {
  if (cartDrawer) cartDrawer.classList.toggle('open');
  if (cartOverlay) cartOverlay.classList.toggle('visible');
}

if (cartBtn) cartBtn.addEventListener('click', toggleCart);
if (closeCart) closeCart.addEventListener('click', toggleCart);
if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
  if (cartDrawer && !cartDrawer.classList.contains('open')) toggleCart();
}

function updateCartUI() {
  if (!cartBtn || !cartItemsContainer || !cartTotalValue) return;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartBtn.innerText = `Cart (${totalItems})`;
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p style="text-align: center; margin-top: 2rem;">Looks like your pet is still deciding 🐾</p>`;
    cartTotalValue.innerText = `₹0`;
    return;
  }
  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item" style="display: flex; gap: 1rem; margin-bottom: 1rem; align-items: center;">
      <img src="${item.image}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;">
      <div style="flex: 1;">
        <h4 style="font-size: 0.85rem; margin: 0;">${item.name}</h4>
        <p style="font-size: 0.75rem; color: #666; margin: 0;">${item.quantity} x ₹${item.price.toLocaleString('en-IN')}</p>
      </div>
      <div style="font-weight: 700; font-size: 0.9rem;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
    </div>
  `).join('');
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  cartTotalValue.innerText = `₹${total.toLocaleString('en-IN')}`;
}

// Three.js Implementation
function init3D() {
  const container = document.querySelector('#hero-canvas');
  if (!container) return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
  const group = new THREE.Group();
  const bodyGeo = new THREE.CapsuleGeometry(1, 1, 4, 32);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xD8A48F, roughness: 0.2 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  group.add(body);
  const headGeo = new THREE.SphereGeometry(0.8, 32, 32);
  const head = new THREE.Mesh(headGeo, bodyMat);
  head.position.y = 1.2;
  group.add(head);
  scene.add(group);
  const particlesCount = 50;
  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }
  const particlesGeo = new THREE.BufferGeometry();
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particlesMat = new THREE.PointsMaterial({ color: 0xA3B18A, size: 0.05 });
  const particles = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particles);
  camera.position.z = 5;
  function animate3D() {
    requestAnimationFrame(animate3D);
    group.rotation.y += 0.005;
    particles.rotation.y -= 0.002;
    group.position.y = Math.sin(Date.now() * 0.002) * 0.2;
    renderer.render(scene, camera);
  }
  animate3D();
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  renderProducts(); 
  initAnimations();
  init3D();
});
