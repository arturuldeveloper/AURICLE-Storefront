<template>
    <div class="collection">
      <h1>{{ $page.ShopifyCollection.title }}</h1>
      <p>{{ $page.ShopifyCollection.description }}</p>
      <img v-if="$page.ShopifyCollection.image" :src="$page.ShopifyCollection.image" :alt="$page.ShopifyCollection.title" />
  
      <!-- Placeholder for products in this collection -->
      <p>Products for this collection will go here.</p>
    </div>
  </template>
  
  <page-query>
  query ($handle: String!) {
    ShopifyCollection(handle: $handle) {
      title
      description
      image
    }
  }
  </page-query>
  