import Image from "next/image";

export default function User({ user, rates }) {
  function getAgeString(age) {
    const titles = [" год", " года", " лет"];
    const cases = [2, 0, 1, 1, 1, 2];
    const postfix =
      titles[
        age % 100 > 4 && age % 100 < 20 ? 2 : cases[age % 10 < 5 ? age % 10 : 5]
      ];
    return age + postfix;
  }

  return (
    <div className="flex flex-col p-2 gap-y-2 w-6/12 bg-white border-solid border-2 border-gray-200 shadow rounded-md">
      <div className="flex gap-x-4 flex-row">
        <Image
          src={user.image.x160}
          width={160}
          height={160}
          alt={`User ${user.id} avatar`}
        ></Image>
        <div className="flex flex-col gap-y-1">
          <h5 className="text-3xl font-bold">{user.nickname}</h5>
          <p className="font-normal">
            {user.sex == "male" ? "Мужчина" : "Женщина"},{" "}
            {getAgeString(user.full_years)}
          </p>
          <p className="font-normal">
            {user.stats.statuses.anime
              .map((list) => {
                const name = {
                  planned: "Запланированно",
                  watching: "Смотрит",
                  completed: "Просмотренно",
                  on_hold: "Отложенно",
                  dropped: "Брошенно",
                };
                return `${name[list.name]} (${list.size})`;
              })
              .join(" | ")}
          </p>
        </div>
      </div>
      <div>
        <ul role="list" className="divide-y divide-gray-100">
          {rates.map((rate) => (
            <li key={rate.id}>
              <div className="flex justify-between p-4">
                <p className="text-lg">{rate.anime.russian}</p>
                <p className="text-lg">{rate.anime.score}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
