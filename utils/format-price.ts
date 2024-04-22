export const formatPrice = (price: any, sale: any) => {
  return (Number(price) - (Number(price) * Number(sale)) / 100).toLocaleString(
    "de-DE"
  );
};

export const price = (price: any) => {
  return Number(price).toLocaleString("de-DE");
};
