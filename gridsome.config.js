module.exports = {
  siteName: "Auricle Jewellery",
  chainWebpack(config) {
    config.plugin("html").tap((args) => {
      if (!args[0]) return args; // 🛑 Prevents undefined error
      args[0].meta = args[0].meta || {}; // 🛑 Ensures meta object exists

      args[0].meta.link = [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap",
        },
      ];
      return args;
    });
  },
};
