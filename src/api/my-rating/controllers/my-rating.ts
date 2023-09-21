/**
 * A set of functions called "actions" for `my-rating`
 */

export default {
  myRatingBeerCount: async (ctx) => {
    const { userId } = ctx.params;
    try {
      if (userId) {
        const myBeerReview = await strapi.db
          .query("api::beer-rating.beer-rating")
          .findWithCount({
            where: {
              user: userId,
            },
            select: ["rating", "id"],
          });

        const myRatingAvg =
          myBeerReview[0].reduce((acc, cur) => acc + cur.rating, 0) /
          myBeerReview[1];
        return {
          count: myBeerReview[1],
          reviewAvg: myRatingAvg,
        };
      }
    } catch (err) {
      return {
        count: 0,
        reviewAvg: 0,
      };
    }
  },
  myRatingBeerList: async (ctx) => {
    const { userId, page } = ctx.params;
    try {
      if (userId && page) {
        const myBeerReview = await strapi.db
          .query("api::beer-rating.beer-rating")
          .findWithCount({
            where: {
              user: userId,
            },
            select: ["id", "rating", "updatedAt"],
            populate: ["beers"],
            limit: 10,
            offset: 10 * page,
          });
        return {
          list: myBeerReview[0],
          totalPage: Math.ceil(myBeerReview[1] / 10),
        };
      }
    } catch (err) {
      return {
        count: 0,
        reviewAvg: 0,
      };
    }
  },
};
