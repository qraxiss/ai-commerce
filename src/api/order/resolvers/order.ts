import { Strapi } from "@strapi/strapi";

const typeDefs = `
    type Mutation {
        payment: Boolean!
    }

    type Query {
        userOrders: [Order]
    }
`;

export default ({ strapi }: { strapi: Strapi }) => ({
  typeDefs,
  resolvers: {
    Query: {
      userOrders: {
        resolve: async (obj, args, context) => {
          return await strapi.service("api::order.order").userOrders();
        },
      },
    },
    Mutation: {
      payment: {
        resolve: async (obj, args, context) => {
          return !!(await strapi.service("api::order.order").payment());
        },
      },
    },
  },
});
