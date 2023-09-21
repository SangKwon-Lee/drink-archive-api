export default {
  routes: [
    {
      method: "GET",
      path: "/my-rating-beer-count/:userId",
      handler: "my-rating.myRatingBeerCount",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/my-rating-beer-list/:userId/:page",
      handler: "my-rating.myRatingBeerList",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
