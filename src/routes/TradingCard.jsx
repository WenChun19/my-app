import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTradingCards } from "../api/cards";
import {
  getTradingCollection,
  updateTradingCollection,
} from "../api/collections";
import { generateRandomInteger } from "../utils/main-helper";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { comingDailyLimit } from "../constants";
dayjs.extend(isSameOrAfter);

const TradingCard = () => {
  const { data: tradingCards } = useQuery({
    queryKey: ["tradingCards"],
    queryFn: getTradingCards,
  });

  const { data: tradingCollection } = useQuery({
    queryKey: ["tradingCollection"],
    queryFn: getTradingCollection,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateTradingCollection,
    onSuccess: () => {
      queryClient.invalidateQueries("tradingCollection");
    },
  });

  // console.log(tradingCards);
  const handleDrawCard = () => {
    if (Object.keys(tradingCollection)?.length === 0) {
      console.log("please login to continue");
      return;
    }
    let updatedTradingCollection = { ...tradingCollection };

    let allowDraw = true;
    let dailyLimit = updatedTradingCollection?.dailyLimit;
    let availableDate = updatedTradingCollection?.availableDate;

    if (dailyLimit == 0 && dayjs().isSame(availableDate ?? dayjs(), "day")) {
      updatedTradingCollection.dailyLimit = comingDailyLimit;
      updatedTradingCollection.availableDate = dayjs()
        .add(1, "day")
        .format("YYYY-MM-DD");
      allowDraw = false;
      console.log("please come back tomorrow");
    }
    if (dayjs().isAfter(availableDate ?? dayjs(), "day")) {
      updatedTradingCollection.dailyLimit = comingDailyLimit;
      updatedTradingCollection.availableDate = dayjs().format("YYYY-MM-DD");
      allowDraw = true;
    } else if (availableDate) {
      allowDraw = false;
      console.log("please come back tomorrow");
    }

    const randomIndex = generateRandomInteger(0, 9);

    const randomCard = tradingCards?.[randomIndex];

    console.log(randomCard);
    if (allowDraw && randomCard) {
      const currentCardCollectionIndex =
        updatedTradingCollection?.cards?.findIndex(
          (card) => +card?.id === +randomCard?.id
        );

      console.log(updatedTradingCollection);
      if (currentCardCollectionIndex !== -1) {
        let updatedCard =
          updatedTradingCollection?.cards[currentCardCollectionIndex];
        updatedCard.quantity++;
        updatedTradingCollection?.cards.splice(
          currentCardCollectionIndex,
          1,
          updatedCard
        );
      } else {
        updatedTradingCollection?.cards.push({ ...randomCard, quantity: 1 });
      }

      updatedTradingCollection.dailyLimit--;
      // console.log(randomIndex);
      // console.log(randomCard);
      // console.log(updatedTradingCollection);
    }
    console.log(updatedTradingCollection);
    mutation.mutate(updatedTradingCollection);
  };
  return (
    <section className="h-full bg-trading-background bg-cover relative">
      <div className="absolute inset-0 bg-gradient-to-r from-white to-slate-800 opacity-40"></div>
      <div className="flex w-full h-full sm:flex-row flex-col sm:gap-0 gap-6">
        <div className="flex-1 flex items-center justify-center">
          <div className="grid  grid-cols-2 sm:grid-cols-3 p-10 gap-12">
            {tradingCards?.map(({ id, title }) => {
              const quantity =
                tradingCollection?.cards?.find((card) => +card?.id === id)
                  ?.quantity ?? 0;
              return (
                <div
                  key={id}
                  className="h-14 bg-amber-200 p-3 text-wrap flex items-center justify-center 
                rounded-lg text-slate-800 text-sm font-extrabold shadow-xl relative"
                >
                  {quantity > 0 ? (
                    <span className="badge absolute right-0 top-0 translate-x-4 -translate-y-2">
                      {quantity}
                    </span>
                  ) : (
                    <></>
                  )}
                  {title}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-1 m-auto z-10">
          <button
            className="btn btn-outline text-white btn-lg"
            onClick={handleDrawCard}
          >
            Draw
          </button>
          {dayjs().isSameOrAfter(
            tradingCollection?.availableDate ?? dayjs(),
            "day"
          ) && tradingCollection?.dailyLimit > 0 ? (
            <div className="text-white w-20 mt-3 text-xs pl-2">
              You have {tradingCollection?.dailyLimit} chances left today
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
};

export default TradingCard;
