import cart from "./api/cart/resolvers/cart";

export async function registerResolvers() {
  [cart].forEach(async (resolver) => {
    await strapi.service("plugin::graphql.extension").use(resolver);
  });
}
