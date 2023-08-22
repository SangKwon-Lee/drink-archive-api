/**
 * A set of functions called "actions" for `beer-rating-count`
 */

export default {
  find: async (ctx, next) => {
    try {
      const ratingList = await strapi.db
        .query("api::beer-rating.beer-rating")
        .findMany({
          select: ["rating"],
        });

      if (Array.isArray(ratingList)) {
        const sumRating = ratingList.reduce(
          (acc, cur) => acc.rating + cur.rating
        );
        const avgRating = sumRating / ratingList.length;
        return {
          rating: avgRating,
          people: ratingList.length,
        };
      } else {
        return {
          rating: 0,
          people: 0,
        };
      }
    } catch (err) {
      ctx.body = err;
    }
  },
};
