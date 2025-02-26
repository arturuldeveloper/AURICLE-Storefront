<template>
  <header class="shopify-section-header">
    <div class="header-wrapper container">
      <div class="header">
        <!-- Logo -->
        <div class="header__heading">
          <router-link to="/" class="header__heading-link">
            <img src="/auricle_logo.png" alt="Auricle Jewellery" class="header__heading-logo">
          </router-link>
        </div>

        <!-- Navigation -->
        <nav class="header__inline-menu">
          <ul class="list-menu list-menu--inline">
            <li class="list-menu-item"><router-link to="/products">Shop</router-link></li>
            <li class="list-menu-item"><router-link to="/about">About</router-link></li>
            <li class="list-menu-item"><router-link to="/contact">Contact</router-link></li>
          </ul>
        </nav>

        <!-- Cart & Account -->
        <div class="header__icons">
          <router-link to="/cart" class="header__icon header__icon--cart">
            🛒 <span class="cart-count-bubble">0</span>
          </router-link>
          <router-link to="/account" class="header__icon header__icon--account">
            👤
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

