export function formattedPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price ?? 0);
}

export function capitalizeWordsRegex(text: string) {
  return text.replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
}
