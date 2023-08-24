export default {
  routes: [
    {
      method: "GET",
      path: "/beer-reco",
      handler: "beer.reco",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
