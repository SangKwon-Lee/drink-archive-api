/**
 * beer controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::beer.beer");

/**
 * beer-rating controller
 */
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::beer.beer", ({ strapi }) => ({
  async reco() {
    try {
      const recommend = await strapi.entityService.findMany("api::beer.beer", {
        sort: { rating: "desc" },
        limit: 12,
        populate: { thumbnail: true },
      });
      return recommend;
    } catch (e) {
      console.log(e);
    }
  },
}));
