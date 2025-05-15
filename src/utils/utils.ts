export function convertAmountFromMiliunits(amount: number) {
  return amount / 1000;
}

export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000);
}

/**
 * the purpose of this function is to parse the date that was extracted from the pdf
 * in the pdf, the date has this format dd/mm/yyyy
 * however, this format is invalid for javascript
 */
export function parseAIExtractedDate(date: string) {
  const [day, month, year] = date.split("/");

  const finalDate = new Date();

  finalDate.setFullYear(Number(year));
  finalDate.setDate(Number(day));
  finalDate.setMonth(Number(year) - 1);

  return finalDate;
}
