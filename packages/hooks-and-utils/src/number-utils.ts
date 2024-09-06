export const formatDecimal = (num: number, decimals: number) => {
  return Number(num).toFixed(decimals);
};

// for handling divided by zero calculations on percentage
// if prev value is 0 and current value is 0, there's no change (0%)
// if prev value is 0 and current value is non-zero, consider it 100% change
export const calculatePercentage = (
  prevValue: number,
  currentValue: number,
  decimalPlaces?: number,
) => {
  if (prevValue - currentValue === 0) {
    return 0;
  } else if (prevValue === 0 && currentValue > 0) {
    return 100;
  }
  return Number(
    (((currentValue - prevValue) / prevValue) * 100).toFixed(
      decimalPlaces ?? 0,
    ),
  );
};

export const formatWithCurrencyShortened = (value: number) => {
  // Usage example:
  // const value1 = 322271.15;
  // const value2 = 1000000;
  // const value3 = 987.12;

  // (formatNumber(value1); // "$322k"
  // (formatNumber(value2); // "$1.0M"
  // (formatNumber(value3); // "$987.12"

  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}k`;
  }
  return `$${value.toFixed(2).replace(/\.00$/, "")}`;
};
