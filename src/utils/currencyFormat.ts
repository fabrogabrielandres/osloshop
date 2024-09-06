export const currencyFormat = (value: number) => {
  const norwegianCurrencyShortForm = "Kr";
  const norwegianCurrencyFormat = new Intl.NumberFormat("no-NO", {
    style: "currency",
    currency: "NOK",
  });
  return norwegianCurrencyFormat
    .formatToParts(123)
    .map(({ type, value }) =>
      type === "currency" ? norwegianCurrencyShortForm : value
    )
    .join("");
};
