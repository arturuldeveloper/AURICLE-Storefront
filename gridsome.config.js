module.exports = {
  siteName: "Auricle Jewellery",
  siteMetadata: {
    title: "Auricle Jewellery",
    description: "Your site description here",
  },
  chainWebpack(config) {
  if (config.plugins.has("html")) {
    config.plugin("html").tap((args) => {
      if (!args[0] || typeof args[0] !== "object") return args;
      args[0].meta = args[0].meta || {};

      // Preload fonts for faster performance
      args[0].link = args[0].link || [];
      args[0].link.push(
        {
          rel: "preload",
          href: "/assets/fonts/Montserrat-Light.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/assets/fonts/Montserrat-Medium.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/assets/fonts/BebasNeue-Regular.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        }
      );

      return args;
    });
  }
  }
}

