<template>
  <Layout>
    <div class="product-container">
      <h1>{{ $page.shopifyProduct.title }}</h1>
      <img :src="$page.shopifyProduct.image" :alt="$page.shopifyProduct.title" />
      <p>{{ $page.shopifyProduct.description }}</p>
      <p class="price">{{ formatPrice($page.shopifyProduct.price) }}</p>
    </div>
  </Layout>
</template>

<script>
export default {
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(price);
    },
  },
};
</script>

<page-query>
query ($id: ID!) {
  shopifyProduct(id: $id) {
    id
    title
    description
    image
    price
  }
}
</page-query>


