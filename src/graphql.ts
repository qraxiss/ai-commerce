import cart from "./api/cart/resolvers/cart";
import payment from "./api/order/resolvers/order";

export async function registerResolvers() {
  [cart, payment].forEach(async (resolver) => {
    await strapi.service("plugin::graphql.extension").use(resolver);
  });
}
