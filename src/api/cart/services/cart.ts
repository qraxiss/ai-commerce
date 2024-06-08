/**
 * cart service
 */

import { factories } from "@strapi/strapi";
import { getId } from "../../../helpers/id";
const services = () => ({
  async addToCart({ id }) {
    const { id: cartId } = await strapi.service("api::cart.cart").userCart();
    return strapi.entityService.update("api::cart.cart", cartId, {
      data: {
        products: {
          connect: [id],
        },
      },
    });
  },

  async removeFromCart({ id }) {
    const { id: cartId } = await strapi.service("api::cart.cart").userCart();
    return strapi.entityService.update("api::cart.cart", cartId, {
      data: {
        products: {
          disconnect: [id],
        },
      },
    });
  },

  async userCart() {
    return await strapi.db.query("api::cart.cart").findOne({
      where: {
        user: getId(),
      },
      populate: {
        products: "*",
      },
    });
  },
});

export default factories.createCoreService("api::cart.cart", services);
