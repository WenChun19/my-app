export const getTradingCards = async () => {
  const response = await fetch("http://localhost:3000/cards", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
  });

  const result = await response.json();
  return result;
};
