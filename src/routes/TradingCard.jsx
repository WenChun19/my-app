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
import PopUpModal from "../components/trading-card/PopUpModal";
import { useRef, useState } from "react";
import WinningDrawModal from "../components/trading-card/WinningDrawModal";
// import { updateLuckyDrawEntries } from "../api/entries";

dayjs.extend(isSameOrAfter);

const TradingCard = () => {
  const cardDrawModalRef = useRef();
  const winningDrawModalRef = useRef();

  const [randomCard, setRandomCard] = useState(null);
  const { data: tradingCards } = useQuery({
    queryKey: ["tradingCards"],
    queryFn: getTradingCards,
  });

  const { data: tradingCollection } = useQuery({
    queryKey: ["tradingCollection"],
    queryFn: getTradingCollection,
  });

  const queryClient = useQueryClient();
  const tradingMutation = useMutation({
    mutationFn: updateTradingCollection,
    onSuccess: () => {
      queryClient.invalidateQueries("tradingCollection");
    },
  });

  // const luckyDrawMutation = useMutation({
  //   mutationFn: updateLuckyDrawEntries,
  // });

  const handleWinningDraw = () => {
    const qualifiedCardIndex = tradingCollection?.cards?.findIndex(
      (card) => +card?.quantity >= 10
    );

    if (qualifiedCardIndex !== -1) {
      tradingCollection?.cards.splice(qualifiedCardIndex, 1);

      if (winningDrawModalRef?.current) {
        winningDrawModalRef.current.showModal();
      }

      // update lucky drawn entries
      // luckyDrawMutation.mutate(qualifiedCard);
    }
  };

  const handleDrawCard = () => {
    if (Object.keys(tradingCollection)?.length === 0) {
      console.log("please login to continue");
      return;
    }
    let updatedTradingCollection = { ...tradingCollection };

    let allowDraw = true;
    let availableDate = updatedTradingCollection?.availableDate;

    if (dayjs().isAfter(availableDate, "day")) {
      updatedTradingCollection.dailyLimit = comingDailyLimit;
      updatedTradingCollection.availableDate = dayjs().format("YYYY-MM-DD");
      allowDraw = true;
    } else if (dayjs().isBefore(availableDate, "day")) {
      allowDraw = false;
      console.log("please come back tomorrow");
    }

    const randomIndex = generateRandomInteger(0, 9);

    const randomCard = tradingCards?.[randomIndex];

    // console.log(randomCard);
    if (allowDraw && randomCard) {
      setRandomCard(randomCard);

      if (cardDrawModalRef?.current) {
        cardDrawModalRef.current.showModal();
      }

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

      if (
        updatedTradingCollection.dailyLimit == 0 &&
        dayjs().isSame(availableDate, "day")
      ) {
        updatedTradingCollection.dailyLimit = comingDailyLimit;
        updatedTradingCollection.availableDate = dayjs()
          .add(1, "day")
          .format("YYYY-MM-DD");
        console.log("please come back tomorrow");
      }
      // console.log(randomIndex);
      // console.log(randomCard);
      // console.log(updatedTradingCollection);
      // handleWinningDraw();
    }

    handleWinningDraw();

    console.log(updatedTradingCollection);
    tradingMutation.mutate(updatedTradingCollection);
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
          <div className="flex gap-2 sm:flex-row sm:gap-4 flex-col items-center">
            <button
              className="btn btn-outline text-white btn-lg"
              onClick={handleDrawCard}
            >
              Draw
            </button>
          </div>

          <div className="text-white w-20 mt-3 text-xs pl-2">
            {dayjs().isSameOrAfter(tradingCollection?.availableDate, "day") &&
            tradingCollection?.dailyLimit > 0
              ? `You have ${tradingCollection?.dailyLimit} chances for drawing cards today`
              : "Ow ow no more already! Come back tomorrow"}
          </div>
        </div>
      </div>
      <PopUpModal
        ref={cardDrawModalRef}
        title={randomCard?.title}
        image={randomCard?.image}
      />
      <WinningDrawModal ref={winningDrawModalRef} />
    </section>
  );
};

export default TradingCard;
