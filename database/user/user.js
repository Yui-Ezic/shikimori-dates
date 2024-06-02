import { getUserRates } from "@/shikimori-api/v1/anime-rates/functions";
import { getUser } from "@/shikimori-api/v1/user/functions";

export function findUser(id) {
  const user = getUser(id);
  return {
    id: user.id,
    nickname: user.nickname,
    image: user.image,
    url: user.url,
    name: user.name,
    sex: user.sex,
    full_years: user.full_years,
    website: user.website,
    about: user.about,
    anime_lists_metadata: user.stats.full_statuses.anime.map((list) => {
      return {
        name: list.name,
        size: list.size,
      };
    }),
    anime_scores_metadata: {
      1: user.stats.scores.anime.find((score) => score.name === "1")?.value,
      2: user.stats.scores.anime.find((score) => score.name === "2")?.value,
      3: user.stats.scores.anime.find((score) => score.name === "3")?.value,
      4: user.stats.scores.anime.find((score) => score.name === "4")?.value,
      5: user.stats.scores.anime.find((score) => score.name === "5")?.value,
      6: user.stats.scores.anime.find((score) => score.name === "6")?.value,
      7: user.stats.scores.anime.find((score) => score.name === "7")?.value,
      8: user.stats.scores.anime.find((score) => score.name === "8")?.value,
      9: user.stats.scores.anime.find((score) => score.name === "9")?.value,
      10: user.stats.scores.anime.find((score) => score.name === "10")?.value,
    },
    anime_types_metadata: user.stats.types.anime,
    anime_rates_metadata: user.stats.ratings.anime,
    last_online_at: user.last_online_at,
  };
}

export function findUserRates(userId) {
  const rates = getUserRates(userId);
  return rates.map((rate) => {
    return {
      id: rate.id,
      score: rate.score,
      anime_id: rate.anime.id,
      anime_russian_name: rate.anime.russian,
    };
  });
}
