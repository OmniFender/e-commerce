export function formattedPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price ?? 0);
}

export function capitalizeWordsRegex(text: string) {
  return text.replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
}

export function timeToReadAnnouncementBarText(announcementBarText: string) {
  const textLength = announcementBarText.length;
  const AVG_WORDS_PER_MINUTE = 180;
  const AVG_WORD_LENGTH = 5;

  const wordsCount = textLength / AVG_WORD_LENGTH;
  const timeToReadInSeconds = (wordsCount / AVG_WORDS_PER_MINUTE) * 60;

  const extraTimeInSeconds = 2;

  const totalTimeToReadTextInSeconds = Math.ceil(
    timeToReadInSeconds + extraTimeInSeconds
  );

  return totalTimeToReadTextInSeconds;
}
