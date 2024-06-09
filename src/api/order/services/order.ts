/**
 * order service
 */

import { factories } from "@strapi/strapi";
import { getId } from "../../../helpers/id";

const services = () => ({
  async payment() {
    const { id: cart, products } = await strapi
      .service("api::cart.cart")
      .userCart();

    if (products.length === 0) {
      throw new Error("There is no item on cart!");
    }

    const order = await strapi.entityService.create("api::order.order", {
      data: {
        cart,
        user: getId(),
      },
    });

    const newCart = await strapi.entityService.create("api::cart.cart", {
      data: {
        user: getId(),
      },
    });

    await strapi.db.query("plugin::users-permissions.user").update({
      where: {
        id: getId(),
      },
      data: {
        cart: {
          connect: newCart.id,
        },
      },
    });

    return order;
  },

  async userOrders() {
    return (
      await strapi.db.query("plugin::users-permissions.user").findOne({
        where: {
          id: getId(),
        },
        populate: {
          orders: {
            populate: {
              cart: "*",
            },
          },
        },
      })
    ).orders;
  },
});

export default factories.createCoreService("api::order.order", services);
