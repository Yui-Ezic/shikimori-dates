import { getUser } from "@/database/user/functions";
import User from "./user";
import { getUserRates } from "@/database/anime-rates/functions";

export default function Compatibility() {
  const user1 = getUser(129127);
  const user1Rates = getUserRates(129127);
  const user2 = getUser(113218);
  const user2Rates = getUserRates(113218);

  return (
    <main className="flex w-full min-h-screen flex-col gap-y-2 items-center p-24">
      <h3 className="text-3xl font-bold mb-2">Совместимость пользователей</h3>
      <User user={user1} rates={user1Rates} />
      <User user={user2} rates={user2Rates} />
    </main>
  );
}
