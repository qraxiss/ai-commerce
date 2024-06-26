/**
 * order service
 */

import { factories } from "@strapi/strapi";
import { getId } from "../../../helpers/id";
import axios from "axios";

const makeSuggest = async (items: string[]) => {
  return (
    await axios.post("http://127.0.0.1:8000/apriori", {
      basket: items,
    })
  ).data;
};

const services = () => ({
  async payment() {
    console.log(getId());

    const { id: cart, products } = await strapi
      .service("api::cart.cart")
      .userCart();

    const stockUpdate = Promise.all(
      products.map((product) =>
        strapi.db.query("api::product.product").update({
          where: {
            id: product.id,
          },
          data: {
            stock: product.stock - 1,
          },
        })
      )
    );

    if (products.length === 0) {
      throw new Error("There is no item on cart!");
    }

    const order = await strapi.entityService.create("api::order.order", {
      data: {
        cart,
        user: getId(),
      },
    });

    // empty user's cart
    await strapi.entityService.update("api::cart.cart", cart, {
      data: {
        products: [],
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

    await stockUpdate;
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

  async makeSuggest() {
    const cart = await strapi.service("api::cart.cart").userCart();
    console.log(cart);

    const items = cart.products.map((item) => item.translate);

    const { recommended_item: translate } = await makeSuggest(items);

    return await strapi.db.query("api::product.product").findOne({
      where: {
        translate,
      },
      populate: {
        image: "*",
      },
    });
  },
});

export default factories.createCoreService("api::order.order", services);
