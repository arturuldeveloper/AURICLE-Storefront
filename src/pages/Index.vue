<template>
  <Layout>
    <!-- Hero Section -->
    <section class="hero">
      <h1 class="hero__title">DESIGN | CREATE | DEFINE</h1>
      <p class="hero__subtitle">REBELLING AGAINST THE ORDINARY</p>
      <div class="hero__buttons">
        <g-link to="/piercing" class="hero__button">LUXURY PIERCING</g-link>
        <g-link to="/bracelets" class="hero__button">WELDED BRACELETS</g-link>
      </div>
    </section>

    <!-- Video Section -->
    <section class="video-section">
      <div class="video-container">
        <video autoplay loop muted playsinline class="video">
          <source src="/AURICLE-piercing.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div class="video-content">
        <p class="video-subtitle">PIERCING AGAINST THE ORDINARY</p>
        <h2 class="video-title">PIERCING STUDIO</h2>
        <g-link to="/collection" class="video-button">LUXURY PIERCING</g-link>
      </div>
    </section>
  </Layout>
</template>
