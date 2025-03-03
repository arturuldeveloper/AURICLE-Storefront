<template>
    <div>
      <h1>Sterling Silver Bracelets</h1>
      <div class="product-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="product-item">
          <g-link :to="product.path">
            <img :src="product.image" :alt="product.title" />
            <h2>{{ product.title }}</h2>
            <p>{{ product.price }}</p>
          </g-link>
        </div>
      </div>
    </div>
  </template>
  
  <page-query>
  query {
    allShopifyProduct {
      edges {
        node {
          id
          title
          productType
          price
          image
          path
        }
      }
    }
  }
  </page-query>
  
  <script>
  export default {
    computed: {
      filteredProducts() {
        return this.$page.allShopifyProduct.edges
          .map(edge => edge.node)
          .filter(product => product.productType === "Sterling Silver Bracelets");
      }
    }
  };
  </script>
  
  <style>
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  .product-item {
    text-align: center;
  }
  </style>
  