const { uuid } = require("uuidv4");

module.exports = () => {
  return async (ctx, next) => {
    if (
      ctx.request.method === "POST" &&
      ctx.request.url.includes("product.product") &&
      !ctx.request.url.includes("actions")
    ) {
      const data = ctx.request.body;

      console.log(data);

      console.log("name", data.name);

      if (!data.slug) {
        data.slug = data.name
          .toLowerCase()
          .split(" ")
          .reduce((acc, cur) => {
            if (acc) {
              acc = `${acc}-${cur}`;
            } else {
              acc = cur;
            }
            return acc;
          }, "");
      }

      if (data.permalink.endsWith("products/")) {
        data.permalink = `${data.permalink}${data.slug}`;
      }

      data.productId = uuid();

      const { color, size } = data.attributes;
      data.sku = skuGenerator(size, color);

      if (!data.salePrice) {
        data.salePrice = data.price;
      }

      if (data.price !== data.salePrice) {
        data.discount = (1 - data.salePrice / data.price) * 100;
      }

      console.log(data);
    }
    await next();
  };
};

// utils

const skuGenerator = (size, color) => {
  console.log(color);

  return `${size}${color.toUpperCase().slice(0, 1)}${color
    .toUpperCase()
    .slice(-1)}${Math.round(Math.random() * 99) + 10}`;
};
