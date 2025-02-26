import axios from "axios";

const SHOPIFY_STORE = "yourstore.myshopify.com"; // Replace with your Shopify store URL
const STOREFRONT_TOKEN = "your-storefront-access-token"; // Replace with your API token

export async function fetchShopifyProducts() {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
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
                  price
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

    return response.data.data.products.edges;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
 
