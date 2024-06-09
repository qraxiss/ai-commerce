/**
 * cart controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::cart.cart",
  ({ strapi }) => ({
    async addToCart(ctx) {
      const { id } = ctx.request.body as any;
      ctx.body = await strapi.service("api::cart.cart").addToCart({ id });
    },
    async userCart(ctx) {
      ctx.body = await strapi.service("api::cart.cart").userCart();
    },
    async removeFromCart(ctx) {
      const { id } = ctx.request.body as any;
      try {
        ctx.body = await strapi
          .service("api::cart.cart")
          .removeFromCart({ id });
      } catch (error: any) {
        ctx.throw(error.message, 400);
      }
    },
  })
);
