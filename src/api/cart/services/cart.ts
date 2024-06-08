/**
 * cart service
 */

import { factories } from "@strapi/strapi";
import { getId } from "../../../helpers/id";
const services = () => ({
  async addToCart({ productId }) {
    const { id } = await strapi.service("api::cart.cart").getUserCart();
    return strapi.entityService.update("api::cart.cart", id, {
      data: {
        items: {
          connect: [productId],
        },
      },
    });
  },

  async removeFromCart({ productId }) {
    const { id } = await strapi.service("api::cart.cart").getUserCart();
    return strapi.entityService.update("api::cart.cart", id, {
      data: {
        items: {
          disconnect: [productId],
        },
      },
    });
  },

  async getUserCart() {
    return await strapi.entityService.findOne("api::cart.cart", getId());
  },
});

export default factories.createCoreService("api::cart.cart", services);
