const axios = require("axios");

const SHOPIFY_STORE = "auricle-jewellery.myshopify.com";
const STOREFRONT_TOKEN = "8b15fe8025136cfc492eb6d0408820dc";

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    // Existing products code ...
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
            }
          }
        }
      }
    `;
    try {
      const response = await axios.post(
        `https://${SHOPIFY_STORE}/api/2025-01/graphql.json`,
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
          productType: product.productType,
          image: product.images.edges.length ? product.images.edges[0].node.originalSrc : "",
          price: product.variants.edges.length
            ? `${product.variants.edges[0].node.priceV2.amount} ${product.variants.edges[0].node.priceV2.currencyCode}`
            : "",
          path: `/${generateSlug(product.title, product.id)}`, // clean product URL
        });
      });
      console.log("✅ Shopify products fetched successfully!");
    } catch (error) {
      console.error("❌ Error fetching Shopify products:", error);
    }

    // --- New: Fetch Shopify Collections ---
    const collectionCollection = addCollection("ShopifyCollection");
    const collectionQuery = `
      {
        collections(first: 250) {
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
      const collResponse = await axios.post(
        `https://${SHOPIFY_STORE}/api/2025-01/graphql.json`,
        { query: collectionQuery },
        {
          headers: {
            "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Collection Response:", collResponse.data.data.collections.edges);
      if (collResponse.data && collResponse.data.data && collResponse.data.data.collections) {
        collResponse.data.data.collections.edges.forEach(({ node: collection }) => {
          collectionCollection.addNode({
            id: collection.id,
            title: collection.title,
            description: collection.description,
            image: collection.image ? collection.image.originalSrc : "",
            handle: collection.handle,
            path: `/${collection.handle}`, // clean URL: remove "/collections"
          });
        });
      }
      console.log("✅ Shopify collections fetched successfully!");
    } catch (error) {
      console.error("❌ Error fetching Shopify collections:", error);
    }
  });
  
  // --- Create pages for collections ---
  api.createPages(({ createPage, graphql }) => {
    const collectionTemplate = "./src/templates/Collection.vue";
    return graphql(`
      {
        allShopifyCollection {
          edges {
            node {
              id
              handle
              path
            }
          }
        }
      }
    `).then(result => {
      result.data.allShopifyCollection.edges.forEach(({ node }) => {
        createPage({
          path: node.path, // e.g. "/sterling-silver-bracelets"
          component: collectionTemplate,
          context: {
            handle: node.handle
          }
        });
      });
    });
  });
};
