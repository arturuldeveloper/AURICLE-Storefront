<template>
  <Layout>
    <section class="collection-page">
      <header class="collection-header">
        <h1 class="collection-title">{{ collection.title }}</h1>
      </header>
      <div v-if="collection.image" class="collection-image">
        <img :src="collection.image" :alt="collection.title" />
      </div>
      <section class="products-section">
        <h2 class="section-title">Products in {{ collection.title }}</h2>
        <!-- Uncomment below to view debugging information on-page -->
        <!-- <pre>{{ debugInfo }}</pre> -->
        <div v-if="filteredProducts.length" class="product-grid">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-item"
          >
            <g-link :to="product.path" class="product-link">
              <div class="product-image-wrapper">
                <img
                  :src="product.image"
                  :alt="product.title"
                  class="product-image"
                />
              </div>
              <div class="product-info">
                <h3 class="product-title">{{ product.title }}</h3>
                <p class="product-price">{{ product.price }}</p>
              </div>
            </g-link>
          </div>
        </div>
        <div v-else class="no-products">
          <p>No products found for this collection.</p>
        </div>
      </section>
    </section>
  </Layout>
</template>

<page-query>
query ($handle: String!) {
  allShopifyCollection(filter: { handle: { eq: $handle } }) {
    edges {
      node {
        title
        image
        handle  # Added handle here
      }
    }
  }
  allShopifyProduct {
    edges {
      node {
        id
        title
        productType
        image
        price
        path
        collections
      }
    }
  }
}
</page-query>

<script>
export default {
  computed: {
    collection() {
      // Now collection.handle will be available since we query it.
      return this.$page.allShopifyCollection.edges[0].node;
    },
    filteredProducts() {
      // Use the collection handle for filtering.
      const target = this.collection.handle;
      return this.$page.allShopifyProduct.edges
        .map(edge => edge.node)
        .filter(product => product.collections && product.collections.includes(target));
    },
    // Optional: debug information for on-page display.
    debugInfo() {
      return {
        collectionTitle: this.collection.title,
        collectionHandle: this.collection.handle,
        allProducts: this.$page.allShopifyProduct.edges.map(e => e.node),
        filteredProducts: this.filteredProducts
      };
    }
  },
  mounted() {
    console.log("Collection title:", this.collection.title);
    console.log("Collection handle:", this.collection.handle);
    console.log("All fetched products:", this.$page.allShopifyProduct.edges.map(e => e.node));
    console.log("Filtered products:", this.filteredProducts);
  }
};
</script>

<style scoped>
.collection-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.collection-header {
  text-align: center;
  margin-bottom: 2rem;
}
.collection-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}
.collection-image img {
  display: block;
  margin: 0 auto 2rem;
  max-width: 100%;
  border-radius: 8px;
}
.products-section {
  margin-top: 3rem;
}
.section-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #333;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
.product-item {
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}
.product-item:hover {
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
.product-item:hover .product-image {
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
.no-products {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 2rem;
}
</style>
