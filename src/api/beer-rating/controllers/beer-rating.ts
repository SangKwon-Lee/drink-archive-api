/**
 * beer-rating controller
 */
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::beer-rating.beer-rating",
  ({ strapi }) => ({
    async give(ctx) {
      const { beers, user, rating } = ctx.request.body;
      try {
        if (beers && user && rating) {
          // * 우선 별점 생성
          const createRating = await strapi
            .service("api::beer-rating.beer-rating")
            .create({
              data: {
                rating,
                beers,
                user,
              },
            });
          // * 해당 맥주의 모든 별점 합계
          const allBeerRatingData = await strapi.db
            .query("api::beer-rating.beer-rating")
            .findMany({
              select: ["rating"],
              where: {
                beers,
              },
              populate: {
                beers: true,
              },
            });

          // * 해당 맥주의 모든 별점 합계
          const sumAllBeerRating = allBeerRatingData.reduce(
            (acc, cur) => acc + cur.rating,
            0
          );

          // * 기존 맥주의 데이터
          const getBeerData = await strapi
            .service("api::beer.beer")
            .findOne(beers);

          //* 맥주 데이터 업데이트
          const beerUpdate = await strapi
            .service("api::beer.beer")
            .update(beers, {
              data: {
                rating: sumAllBeerRating / (getBeerData.people + 1),
                people: getBeerData.people + 1,
              },
            });

          return beerUpdate;
        } else {
          return "데이터가 올바르지 않습니다.";
        }
      } catch (e) {
        console.log(e);
      }
    },
    async giveUpdate(ctx) {
      const { beers, rating, ratingId } = ctx.request.body;
      try {
        if (beers && rating && ratingId) {
          // * 우선 별점 생성
          const updateRating = await strapi
            .service("api::beer-rating.beer-rating")
            .update(ratingId, {
              data: {
                rating,
              },
            });
          // // * 해당 맥주의 모든 별점 합계
          const allBeerRatingData = await strapi.db
            .query("api::beer-rating.beer-rating")
            .findMany({
              select: ["rating"],
              where: {
                beers,
              },
              populate: {
                beers: true,
              },
            });

          // * 해당 맥주의 모든 별점 합계
          const sumAllBeerRating = allBeerRatingData.reduce(
            (acc, cur) => acc + cur.rating,
            0
          );

          // * 기존 맥주의 데이터
          const getBeerData = await strapi
            .service("api::beer.beer")
            .findOne(beers);

          //* 맥주 데이터 업데이트
          const beerUpdate = await strapi
            .service("api::beer.beer")
            .update(beers, {
              data: {
                rating: sumAllBeerRating / getBeerData.people,
                people: getBeerData.people,
              },
            });
          return beerUpdate;
        } else {
          return "데이터가 올바르지 않습니다.";
        }
      } catch (e) {
        console.log(e);
      }
    },
    async giveDelete(ctx) {
      const { id, beers } = ctx.params;
      try {
        if (id) {
          // * 우선 별점 생성
          const deleteRating = await strapi
            .service("api::beer-rating.beer-rating")
            .delete(id);

          // * 해당 맥주의 모든 별점 합계
          const allBeerRatingData = await strapi.db
            .query("api::beer-rating.beer-rating")
            .findMany({
              select: ["rating"],
              where: {
                beers,
              },
              populate: {
                beers: true,
              },
            });

          // * 해당 맥주의 모든 별점 합계
          const sumAllBeerRating = allBeerRatingData.reduce(
            (acc, cur) => acc + cur.rating,
            0
          );

          // * 기존 맥주의 데이터
          const getBeerData = await strapi
            .service("api::beer.beer")
            .findOne(beers);

          //* 맥주 데이터 업데이트
          const beerUpdate = await strapi
            .service("api::beer.beer")
            .update(beers, {
              data: {
                rating: sumAllBeerRating / (getBeerData.people - 1),
                people: getBeerData.people - 1,
              },
            });

          return beerUpdate;
        } else {
          return "데이터가 올바르지 않습니다.";
        }
      } catch (e) {
        console.log(e);
      }
    },
  })
);
