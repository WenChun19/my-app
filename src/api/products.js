export const getProductListing = async () => {
  const response = await fetch("http://localhost:3000/products", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    mode: 'cors'
  });

  const result = await response.json();
  return result;
};
