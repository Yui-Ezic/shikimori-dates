import { getUser } from "@/database/user/functions";
import User from "./user";
import { getUserRates } from "@/database/anime-rates/functions";

export default function Compatibility() {
  const user1Id = 129127;
  const user2Id = 113218;

  const user1 = getUser(user1Id);
  const user1Rates = getUserRates(user1Id);

  const user2 = getUser(user2Id);
  const user2Rates = getUserRates(user2Id);

  const interscetion = findIntersection(user1Rates, user2Rates);

  return (
    <main className="flex w-full min-h-screen flex-col gap-y-2 items-center p-24">
      <h3 className="text-3xl font-bold mb-2">Совместимость пользователей</h3>
      <User user={user1} rates={user1Rates} />
      <User user={user2} rates={user2Rates} />
      <div className="flex flex-col p-2 gap-y-2 w-6/12 bg-white border-solid border-2 border-gray-200 shadow rounded-md">
        {interscetion.length === 0 ? (
          <p className="text-2xl text-center">
            Нету одновременно просмотренных аниме
          </p>
        ) : (
          <ul role="list" className="divide-y divide-gray-100">
            {interscetion.map((rate) => (
              <li key={rate.id}>
                <div className="flex justify-between p-4">
                  <p className="text-lg">{rate.user1Rate.anime.russian}</p>
                  <p className="text-lg">{rate.user2Rate.anime.russian}</p>
                  <div className="flex gap-x-4">
                    <p className="text-lg">{rate.user1Rate.anime.score}</p>
                    <p className="text-lg">{rate.user2Rate.anime.score}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

function findIntersection(user1Rates, user2Rates) {
  const interscetion = [];
  user1Rates.forEach((user1Rate) => {
    const user2Rate = user2Rates.find(
      (user2Rate) => user1Rate.anime.id == user2Rate.anime.id
    );
    if (user2Rate) {
      interscetion.push({ user1Rate: user1Rate, user2Rate: user2Rate });
    }
  });
  return interscetion;
}
