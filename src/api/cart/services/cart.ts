/**
 * cart service
 */

import { factories } from "@strapi/strapi";
import { getId } from "../../../helpers/id";

const populate = {
  products: {
    populate: {
      categories: true,
      image: true,
    },
  },
};

const services = () => ({

  async addToCart({ id }) {
    let cart = await strapi.service("api::cart.cart").userCart();

    if (!cart) {
      cart = await strapi.entityService.create("api::cart.cart", {
        data: {
          products: [],
        },
      });
    }

    const { id: cartId } = await strapi.service("api::cart.cart").userCart();
    return strapi.entityService.update("api::cart.cart", cartId, {
      data: {
        products: {
          connect: [{id}],
        },
      },
      populate,
    });
  },

  async removeFromCart({ id }) {
    const cart = await strapi.service("api::cart.cart").userCart();
    const { id: cartId } = cart;
    console.log("Gelen istek id'si: ", id);

    if (cart.products.length === 0) {
      throw new Error("There is no item in the cart!");
    }

    const productToRemove = cart.products.find(product => product.id === id);
    if (!productToRemove) {
      throw new Error("Product not found in the cart!");
    }

    return strapi.entityService.update("api::cart.cart", cartId, {
      data: {
        products: {
          disconnect: [id],
        },
      },
      populate,
    });
  },

  async userCart() {
    return await strapi.db.query("api::cart.cart").findOne({
      where: {
        user: getId(),
      },
      populate,
    });
  },
});

export default factories.createCoreService("api::cart.cart", services);
