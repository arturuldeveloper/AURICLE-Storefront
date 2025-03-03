<template>
  <Layout>
    <section class="shop-page">
      <header class="shop-header">
        <h1 class="shop-title">Shop</h1>
      </header>

      <section class="collections-section">
        <h2 class="section-title">Collections</h2>
        <div class="collections-grid">
          <div
            v-for="collection in collections"
            :key="collection.id"
            class="collection-card"
          >
            <g-link :to="'/' + collection.handle" class="collection-link">
              <div class="collection-card-content">
                <h3 class="collection-card-title">{{ collection.title }}</h3>
                <div v-if="collection.image" class="collection-card-image">
                  <img :src="collection.image" :alt="collection.title" />
                </div>
              </div>
            </g-link>
          </div>
        </div>
      </section>

      <section class="products-section">
        <h2 class="section-title">All Products</h2>
        <div class="products-grid">
          <div
            v-for="product in $page.products.edges"
            :key="product.node.id"
            class="product-card"
          >
            <g-link :to="product.node.path" class="product-link">
              <div class="product-image-wrapper">
                <img
                  v-if="product.node.image"
                  :src="product.node.image"
                  :alt="product.node.title"
                  class="product-image"
                />
              </div>
              <div class="product-info">
                <h3 class="product-title">{{ product.node.title }}</h3>
                <p class="product-price">{{ formatPrice(product.node.price) }}</p>
              </div>
            </g-link>
          </div>
        </div>
      </section>
    </section>
  </Layout>
</template>

<page-query>
query {
  collections: allShopifyCollection {
    edges {
      node {
        id
        title
        handle
        image
      }
    }
  }
  products: allShopifyProduct {
    edges {
      node {
        id
        title
        image
        price
        path
      }
    }
  }
}
</page-query>

<script>
export default {
  methods: {
    formatPrice(price) {
      if (!price || isNaN(parseFloat(price))) return "Price unavailable";
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(parseFloat(price));
    }
  },
  computed: {
    collections() {
      return this.$page.collections.edges.map(edge => edge.node);
    }
  }
};
</script>

<style scoped>
.shop-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.shop-header {
  text-align: center;
  margin-bottom: 2rem;
}
.shop-title {
  font-size: 2.5rem;
  color: #333;
}
.section-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #333;
}
.collections-section {
  margin-bottom: 3rem;
}
.collections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}
.collection-card {
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}
.collection-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.collection-link {
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 1rem;
  text-align: center;
}
.collection-card-title {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
}
.collection-card-image img {
  max-width: 100%;
  border-radius: 4px;
  margin-top: 0.5rem;
}
.products-section {
  margin-bottom: 3rem;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
.product-card {
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}
.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.product-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.product-image-wrapper {
  width: 100%;
  overflow: hidden;
}
.product-image {
  width: 100%;
  display: block;
  transition: transform 0.3s ease;
}
.product-card:hover .product-image {
  transform: scale(1.05);
}
.product-info {
  padding: 1rem;
  text-align: center;
}
.product-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
.product-price {
  font-size: 1rem;
  color: #333;
}
</style>
