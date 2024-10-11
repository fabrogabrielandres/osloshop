export const currencyFormat = (value: number) => {
    return new Intl.NumberFormat("no-NO", {
    style: "currency",
    currency: "NOK",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
