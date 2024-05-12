import { useQuery } from "@tanstack/react-query";
import { getTradingCards } from "../api/cards";

const TradingCard = () => {
  const { data: tradingCards } = useQuery({
    queryKey: ["tradingCards"],
    queryFn: getTradingCards,
  });
  return (
    <section className="bg-trading-background bg-cover relative">
      <div className="absolute inset-0 bg-gradient-to-r from-white to-slate-700 opacity-40"></div>
      <div className="flex w-full sm:flex-row flex-col sm:gap-0 gap-6">
        <div className="flex-1 flex items-center justify-center">
          <div className="grid  grid-cols-2 sm:grid-cols-3 p-10 gap-12">
            {tradingCards?.map(({ id, title }) => (
              <div
                key={id}
                className="h-14 bg-amber-200 p-3 text-wrap flex items-center justify-center 
                rounded-lg text-slate-800 text-sm font-extrabold shadow-xl relative"
              >
                <span className="badge absolute right-0 top-0 translate-x-4 -translate-y-2">
                  2
                </span>
                {title}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 m-auto z-10">
          <div className="btn btn-outline text-white btn-lg">Draw</div>
          <div className="text-white w-20 mt-3 text-xs pl-2">You have 3 chances left today</div>
        </div>
      </div>
    </section>
  );
};

export default TradingCard;
