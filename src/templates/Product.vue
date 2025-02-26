<template>
  <Layout>
    <div class="product-page">
      <h1>{{ $page.shopifyProduct.title }}</h1>
      <img :src="$page.shopifyProduct.image" :alt="$page.shopifyProduct.title" />
      <p>{{ $page.shopifyProduct.description }}</p>
      <p>{{ $page.shopifyProduct.price }}</p>
    </div>
  </Layout>
</template>

<page-query>
query($handle: String!) {
  shopifyProduct(handle: $handle) { 
    title
    description
    image
    price
  }
}
</page-query>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.product-details img {
  max-width: 100%;
  height: auto;
}

.price {
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
}
</style>
