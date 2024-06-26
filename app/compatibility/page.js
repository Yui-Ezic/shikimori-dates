import User from "./user";
import RatesList from "./rates-list";
import { findUser, findUserRates } from "@/database/user/user";

export default function Compatibility() {
  const user1Id = 129127;
  const user2Id = 113218;

  const user1 = findUser(user1Id);
  const user1Rates = findUserRates(user1Id);

  const user2 = findUser(user2Id);
  const user2Rates = findUserRates(user2Id);

  const ratesCompatibility = findRatesCompatibility(user1Rates, user2Rates);

  return (
    <main className="flex w-full min-h-screen flex-col gap-y-2 items-center p-24">
      <h3 className="text-3xl font-bold mb-2">Совместимость пользователей</h3>
      <User user={user1} />
      <User user={user2} />
      <div className="flex flex-col p-2 gap-y-2 w-6/12 bg-white border-solid border-2 border-gray-200 shadow rounded-md">
        <h5 className="text-2xl font-bold text-center">
          Одновременно просмотренные аниме
        </h5>
        {ratesCompatibility.interscetion.length === 0 ? (
          <p className="text-xl text-slate-400 text-center">
            Нету одновременно просмотренных аниме
          </p>
        ) : (
          <ul role="list" className="divide-y divide-gray-100">
            {ratesCompatibility.interscetion.map((rate) => (
              <li key={rate.leftRate.id}>
                <div className="flex justify-between p-4">
                  <p className="text-lg">{rate.leftRate.anime_russian_name}</p>
                  <div className="flex gap-x-4">
                    <p className="text-lg">
                      {rate.leftRate.score == 0 ? "-" : rate.leftRate.score}
                    </p>
                    <p className="text-lg">
                      {rate.rightRate.score == 0 ? "-" : rate.rightRate.score}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <h5 className="text-2xl font-bold text-center">
          Аниме, которые посмотрел только {user1.nickname}
        </h5>
        <RatesList rates={ratesCompatibility.leftDifference}></RatesList>

        <h5 className="text-2xl font-bold text-center">
          Аниме, которые посмотрел только {user2.nickname}
        </h5>
        <RatesList rates={ratesCompatibility.rightDifference}></RatesList>
      </div>
    </main>
  );
}

function findRatesCompatibility(leftRates, rightRates) {
  const interscetion = [];
  const leftDifference = [];
  const rightDifference = [];
  leftRates.forEach((leftRate) => {
    const rightRate = rightRates.find(
      (rightRate) => leftRate.anime_id == rightRate.anime_id
    );
    if (rightRate) {
      interscetion.push({ leftRate: leftRate, rightRate: rightRate });
    } else {
      leftDifference.push(leftRate);
    }
  });
  rightRates.forEach((rightRate) => {
    const leftRate = leftRates.find(
      (leftRate) => leftRate.anime_id == rightRate.anime_id
    );
    if (!leftRate) {
      rightDifference.push(rightRate);
    }
  });
  return {
    interscetion: interscetion,
    leftDifference: leftDifference,
    rightDifference: rightDifference,
  };
}
