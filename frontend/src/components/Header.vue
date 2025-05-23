<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import hamburgerIcon from '../assets/burger-menu-svgrepo-com.svg'
import logoIcon from '../assets/scooter.svg'

const menuOpen = ref(false)
const dropdown = ref(null)
const menuButton = ref(null)

const handleClickOutside = (event) => {
  const clickedOutsideDropdown =
    dropdown.value && !dropdown.value.contains(event.target)
  const clickedOutsideButton =
    menuButton.value && !menuButton.value.contains(event.target)

  if (menuOpen.value && clickedOutsideDropdown && clickedOutsideButton) {
    menuOpen.value = false
  }
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <header class="site-header">
    <div class="header-container">
      <RouterLink to="/" class="logo-container">
        <img :src="logoIcon" alt="Logo" class="logo-image" />
      </RouterLink>

      <!-- Desktop Menu -->
      <nav class="desktop-menu">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/cards" class="nav-link">Portfolio</RouterLink>
        <RouterLink to="/blog-music" class="nav-link">Blog Music</RouterLink>
        <RouterLink to="/blog-science" class="nav-link">Blog Science</RouterLink>
        <RouterLink to="/blog-list" class="nav-link">Blog List</RouterLink>
        <RouterLink to="/add-post" class="nav-link">Add Post</RouterLink>
        <RouterLink to="/login" class="nav-link">Login</RouterLink>
      </nav>

      <!-- Hamburger Button -->
      <button @click="toggleMenu" class="hamburger-button" ref="menuButton" aria-label="Toggle menu">
        <img :src="hamburgerIcon" alt="Menu" class="hamburger-icon" />
      </button>
    </div>

    <!-- Mobile Dropdown Menu -->
    <transition name="fade-slide">
      <nav v-if="menuOpen" ref="dropdown" class="mobile-menu">
        <RouterLink to="/" class="mobile-link" @click="menuOpen = false">Home</RouterLink>
        <RouterLink to="/cards" class="mobile-link" @click="menuOpen = false">Portfolio</RouterLink>
        <RouterLink to="/blog-music" class="mobile-link" @click="menuOpen = false">Blog Music</RouterLink>
        <RouterLink to="/blog-science" class="mobile-link" @click="menuOpen = false">Blog Science</RouterLink>
        <RouterLink to="/blog-list" class="mobile-link" @click="menuOpen = false">Blog List</RouterLink>
        <RouterLink to="/add-post" class="mobile-link" @click="menuOpen = false">Add Post</RouterLink>
        <RouterLink to="/login" class="mobile-link" @click="menuOpen = false">Login</RouterLink>      
    </nav>
    </transition>
  </header>
</template>

<style>
/* Reset some default styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  padding-top: 70px; /* Adjust this value based on your header height */
  font-family: -apple-system, BlinkMacSystemFont, 'San Francisco', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Header Styles */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  height: 70px;
}

/* Logo Styles */
.logo-container {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-image {
  height: 2.5rem;
  width: auto;
}

/* Desktop Menu Styles */
.desktop-menu {
  display: none; /* Hidden on mobile */
}

.nav-link {
  color: var(--color-text-dark);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  letter-spacing: 0.01rem;
}

.nav-link:hover {
  background-color: var(--color-header-ultralight);
  color: var(--color-primary);
}

.router-link-active {
  color: var(--color-primary);
  font-weight: 600;
}

/* Hamburger Button Styles */
.hamburger-button {
  display: block;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 100;
}

.hamburger-button:focus {
  outline: none;
}

.hamburger-icon {
  width: 24px;
  height: 24px;
}

/* Mobile Menu Styles */
.mobile-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 70px; /* Height of the header */
  right: 0;
  width: 250px;
  background-color: var(--color-myapp-white);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 0 8px;
  padding: 0.5rem 0;
  z-index: 90;
  overflow: hidden;
}

.mobile-link {
  color: var(--color-text-dark);
  text-decoration: none;
  padding: 0.6rem 1.25rem;
  font-size: 0.95rem;
  transition: background-color 0.2s;
  border-left: 3px solid transparent;
  letter-spacing: 0.01rem;
}

.mobile-link:hover {
  background-color: var(--color-header-ultralight);
  border-left-color: var(--color-primary);
}

.mobile-link.router-link-active {
  color: var(--color-primary);
  border-left-color: var(--color-primary);
  background-color: var(--color-header-ultralight);
}

/* Animation for mobile menu */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Media Queries for Responsive Design */
@media (min-width: 768px) {
  .desktop-menu {
    display: flex;
    align-items: center;
  }

  .hamburger-button {
    display: none;
  }

  .mobile-menu {
    display: none !important;
  }
}

/* For very small screens */
@media (max-width: 480px) {
  .header-container {
    padding: 0.5rem 1rem;
  }
  
  .logo-image {
    height: 2rem;
  }
}
</style>