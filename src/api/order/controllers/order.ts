/**
 * order controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async payment(ctx) {
      try {
        ctx.body = await strapi.service("api::order.order").payment();
      } catch (error: any) {
        ctx.throw(error.message, 400);
      }
    },
  })
);
