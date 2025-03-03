<template>
  <div class="collection">
    <h1>{{ collection.title }}</h1>
    <p>{{ collection.description }}</p>
    <img v-if="collection.image" :src="collection.image" :alt="collection.title" />
    <p>Products for this collection will go here.</p>
  </div>
</template>

<page-query>
query ($handle: String!) {
  allShopifyCollection(filter: { handle: { eq: $handle } }) {
    edges {
      node {
        title
        description
        image
      }
    }
  }
}
</page-query>

<script>
export default {
  computed: {
    collection() {
      // Assumes there's only one collection matching the handle.
      return this.$page.allShopifyCollection.edges[0].node;
    }
  }
};
</script>
