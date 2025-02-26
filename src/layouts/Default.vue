<script>
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Footer,
  },
};
</script>

<template>
  <div class="layout">
    <!-- Main Header -->
    <header class="shopify-section-header">
      <div class="header-wrapper">
        <div class="header">
          <!-- Logo -->
          <div class="header__heading">
            <g-link to="/" class="header__heading-link">
              <img src="/auricle_logo.png" alt="Auricle Jewellery" class="header__heading-logo">
            </g-link>
          </div>
        </div>
      </div>
    </header>

    <!-- New Menu Section -->
    <nav class="header-menu">
      <ul class="header-menu__list">
        <li class="header-menu__item"><g-link to="/">Home</g-link></li>
        <li class="header-menu__item"><g-link to="/sterling-silver-bracelets/">Bracelets</g-link></li>
        <li class="header-menu__item"><g-link to="/products/">Shop</g-link></li>
        <li class="header-menu__item"><g-link to="/contact/">Contact</g-link></li>
      </ul>
    </nav>

    <!-- Main Content -->
    <slot />
        <!-- Footer -->
        <Footer />
  </div>
</template>
