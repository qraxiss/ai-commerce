/**
 * cart service
 */

import { factories } from "@strapi/strapi";
import { getId } from "../../../helpers/id";
const services = () => ({
  async addToCart({ id }) {
    const { id: cartId } = await strapi.service("api::cart.cart").getUserCart();
    return strapi.entityService.update("api::cart.cart", cartId, {
      data: {
        products: {
          connect: [id],
        },
      },
    });
  },

  async removeFromCart({ id }) {
    const { id: cartId } = await strapi.service("api::cart.cart").getUserCart();
    return strapi.entityService.update("api::cart.cart", cartId, {
      data: {
        products: {
          disconnect: [id],
        },
      },
    });
  },

  async getUserCart() {
    return await strapi.entityService.findOne("api::cart.cart", getId());
  },
});

export default factories.createCoreService("api::cart.cart", services);
