export default {
  routes: [
    {
      method: "POST",
      path: "/order/payment",
      handler: "order.payment",
    },
    {
      method: "POST",
      path: "/order/makeSuggest",
      handler: "order.makeSuggest",
    },
  ],
};
