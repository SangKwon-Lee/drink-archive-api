export default {
  routes: [
    {
      method: "POST",
      path: "/beer-rating-give",
      handler: "beer-rating.give",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/beer-rating-give-update",
      handler: "beer-rating.giveUpdate",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/beer-rating-give-delete/:id/:beers",
      handler: "beer-rating.giveDelete",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
