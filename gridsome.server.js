const axios = require("axios");

const SHOPIFY_STORE = "auricle-jewellery.myshopify.com";
const STOREFRONT_TOKEN = "8b15fe8025136cfc492eb6d0408820dc";

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    const productCollection = addCollection("ShopifyProduct");

    const query = `
      {
        products(first: 200) {
          edges {
            node {
              id
              handle
              title
              description
              productType  # <-- Ensure this is included
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
        `https://${SHOPIFY_STORE}/api/2024-01/graphql.json`,
        { query },
        {
          headers: {
            "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("🔍 Shopify API Response:", response.data);

      if (!response.data || !response.data.data || !response.data.data.products) {
        console.error("❌ Shopify API did not return products. Response:", response.data);
        return;
      }

      const products = response.data.data.products.edges;

      products.forEach(({ node: product }) => {
        function generateSlug(title, id) {
          return title
            ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + id.replace("gid://shopify/Product/", "")
            : id.replace("gid://shopify/Product/", "");
        }

        productCollection.addNode({
          id: product.id,
          title: product.title,
          description: product.description,
          productType: product.productType,  // <-- Ensure this is stored
          image: product.images.edges.length ? product.images.edges[0].node.originalSrc : "",
          price: product.variants.edges.length
            ? `${product.variants.edges[0].node.priceV2.amount} ${product.variants.edges[0].node.priceV2.currencyCode}`
            : "",
          path: `/${generateSlug(product.title, product.id)}`, // ✅ Generates clean URL: /{product-title}
        });
      });

      console.log("✅ Shopify products fetched successfully!");
    } catch (error) {
      console.error("❌ Error fetching Shopify products:", error);
    }
  });
};
