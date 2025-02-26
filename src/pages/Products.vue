<template>
  <Layout>
    <div class="container">
      <h1>Our Products</h1>
      <div class="products-grid">
        <div
          v-for="product in $page.products.edges"
          :key="product.node.id"
          class="product-card"
        >
          <router-link :to="product.node.path">
            <img :src="product.node.image" :alt="product.node.title" />
            <h2>{{ product.node.title }}</h2>
            <p>{{ product.node.price }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  methods: {
    productPath(node) {
      // Remove the Shopify prefix from the ID to create a clean, unique URL.
      const cleanId = node.id.replace("gid://shopify/Product/", "");
      return `/product/${node.handle}-${cleanId}`;
    },
  },
};
</script>

<page-query>
query {
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


<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.product-card img {
  max-width: 100%;
  height: auto;
}

.product-card a {
  text-decoration: none;
  color: inherit;
}

.product-card h2 {
  font-size: 18px;
  margin: 10px 0;
}
</style>
