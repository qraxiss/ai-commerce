import { Strapi } from "@strapi/strapi";

const typeDefs = `
    type Query {
        userCart: Cart!
    }

    type Mutation {
        removeFromCart(id:ID!): Cart!
        addToCart(id:ID!): Cart!
    }
`;

export default ({ strapi }: { strapi: Strapi }) => ({
  typeDefs,
  resolvers: {
    Query: {
      userCart: {
        resolve: async (obj, args, context) => {
          return await strapi.service("api::cart.cart").userCart();
        },
      },
    },
    Mutation: {
      addToCart: {
        resolve: async (obj, { id }, context) => {
          return await strapi.service("api::cart.cart").addToCart({ id });
        },
      },
      removeFromCart: {
        resolve: async (obj, { id }, context) => {
          return await strapi.service("api::cart.cart").removeFromCart({ id });
        },
      },
    },
  },
});
