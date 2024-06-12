import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async beforeCreate(event: any) {
    const { id } = await strapi.entityService.create("api::cart.cart", {
      data: {},
    });
    event.params.data.cart = id;
  },
});
