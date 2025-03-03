const axios = require("axios");

const SHOPIFY_STORE = "auricle-jewellery.myshopify.com";
const STOREFRONT_TOKEN = "8b15fe8025136cfc492eb6d0408820dc";

module.exports = function (api) {
  // Fetch and add products
  api.loadSource(async ({ addCollection }) => {
    const productCollection = addCollection("ShopifyProduct");
    const productQuery = `
      {
        products(first: 200) {
          edges {
            node {
              id
              handle
              title
              description
              productType
              images(first: 1) {
                edges {
                  node {
                    originalSrc
                    altText
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
              collections(first: 10) {
                edges {
                  node {
                    handle
                    title
                  }
                }
              }
            }
          }
        }
      }
    `;
    try {
      const response = await axios.post(
        `https://${SHOPIFY_STORE}/api/2024-10/graphql.json`,
        { query: productQuery },
        {
          headers: {
            "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );
      const products = response.data.data.products.edges;
      products.forEach(({ node: product }) => {
        function generateSlug(title, id) {
          return title
            ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") +
              "-" +
              id.replace("gid://shopify/Product/", "")
            : id.replace("gid://shopify/Product/", "");
        }
        productCollection.addNode({
          id: product.id,
          title: product.title,
          description: product.description,
          productType: product.productType, // remains empty if Shopify returns empty
          // New: store the handles of collections this product belongs to.
          collections: product.collections.edges.map(edge => edge.node.handle),
          image: product.images.edges.length
            ? product.images.edges[0].node.originalSrc
            : "",
          price: product.variants.edges.length
            ? `${product.variants.edges[0].node.priceV2.amount} ${product.variants.edges[0].node.priceV2.currencyCode}`
            : "",
          path: `/${generateSlug(product.title, product.id)}`,
        });
      });
      console.log("✅ Shopify products fetched successfully!");
    } catch (error) {
      console.error("❌ Error fetching Shopify products:", error);
    }
  });

  // Fetch and add collections
  api.loadSource(async ({ addCollection }) => {
    const collectionCollection = addCollection("ShopifyCollection");
    const collectionQuery = `
      {
        collections(first: 100) {
          edges {
            node {
              id
              handle
              title
              description
              image {
                originalSrc
                altText
              }
            }
          }
        }
      }
    `;
    try {
      const response = await axios.post(
        `https://${SHOPIFY_STORE}/api/2024-10/graphql.json`,
        { query: collectionQuery },
        {
          headers: {
            "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );
      const collections = response.data.data.collections.edges;
      collections.forEach(({ node: collection }) => {
        collectionCollection.addNode({
          id: collection.id,
          handle: collection.handle,
          title: collection.title,
          description: collection.description,
          image: collection.image ? collection.image.originalSrc : ""
        });
      });
      console.log("✅ Shopify collections fetched successfully!");
    } catch (error) {
      console.error("❌ Error fetching Shopify collections:", error);
    }
  });

  // Create dynamic pages for collections at the root (e.g. /collection-name)
  api.createPages(({ createPage, graphql }) => {
    return graphql(`
      {
        allShopifyCollection {
          edges {
            node {
              handle
            }
          }
        }
      }
    `).then(result => {
      result.data.allShopifyCollection.edges.forEach(({ node }) => {
        createPage({
          path: `/${node.handle}`,
          component: './src/templates/Collection.vue',
          context: {
            handle: node.handle
          }
        });
      });
    });
  });
};
