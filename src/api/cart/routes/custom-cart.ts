export default {
  routes: [
    {
      method: "POST",
      path: "/cart/addToCart",
      handler: "cart.addToCart",
    },
    {
      method: "GET",
      path: "/cart/userCart",
      handler: "cart.userCart",
    },
    {
      method: "POST",
      path: "/cart/removeFromCart",
      handler: "cart.removeFromCart",
    },
  ],
};
