export default function RatesList({ rates }) {
  if (rates.length === 0) {
    return <p className="text-xl text-slate-400 text-center">Список пустой</p>;
  }
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {rates.map((rate) => (
        <li key={rate.id}>
          <div className="flex justify-between p-4">
            <p className="text-lg">{rate.anime.russian}</p>
            <div className="flex gap-x-4">
              <p className="text-lg">{rate.anime.score}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
