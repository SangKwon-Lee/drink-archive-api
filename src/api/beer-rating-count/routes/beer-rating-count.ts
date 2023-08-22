export default {
  routes: [
    {
      method: "GET",
      path: "/beer-rating-count",
      handler: "beer-rating-count.find",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
