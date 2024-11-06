import {
  format,
  isToday,
  isYesterday,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  isSameDay,
  isSameWeek,
  isSameMonth,
  isSameYear,
  subWeeks,
  subMonths,
  subYears,
} from "date-fns";

interface DateRange {
  startDate: Date;
  endDate?: Date;
}

// Type guard to check if date range spans exactly one day
const isOneDay = (period: DateRange): boolean => {
  return period.endDate ? isSameDay(period.startDate, period.endDate) : true;
};

// Check if date range represents a complete period
const isCompletePeriod = (
  period: DateRange,
  startOfPeriodFn: (date: Date) => Date,
  endOfPeriodFn: (date: Date) => Date,
): boolean => {
  if (!period.endDate) return false;

  const periodStart = startOfPeriodFn(period.startDate);
  const periodEnd = endOfPeriodFn(period.startDate);

  return (
    isSameDay(period.startDate, periodStart) &&
    isSameDay(period.endDate, periodEnd)
  );
};

// Check if the period is the current period (contains today)
const isCurrentPeriod = (
  period: DateRange,
  compareFn: (date1: Date, date2: Date) => boolean,
): boolean => {
  const now = new Date();
  return compareFn(period.startDate, now);
};

// Check if the period represents the last complete period
const isLastPeriod = (
  period: DateRange,
  startOfPeriodFn: (date: Date) => Date,
  endOfPeriodFn: (date: Date) => Date,
  subPeriodFn: (date: Date, amount: number) => Date,
): boolean => {
  if (!period.endDate) return false;

  const now = new Date();
  const lastPeriodStart = startOfPeriodFn(subPeriodFn(now, 1));
  const lastPeriodEnd = endOfPeriodFn(subPeriodFn(now, 1));

  return (
    isSameDay(period.startDate, lastPeriodStart) &&
    isSameDay(period.endDate, lastPeriodEnd)
  );
};

// Get the previous period based on current period
const getPreviousPeriod = (currentPeriod: DateRange): DateRange => {
  const { startDate, endDate } = currentPeriod;

  // Handle single day
  if (!endDate || isOneDay(currentPeriod)) {
    const prevDay = new Date(startDate);
    prevDay.setDate(startDate.getDate() - 1);
    return { startDate: prevDay, endDate: prevDay };
  }

  // Handle complete week
  if (isCompletePeriod(currentPeriod, startOfWeek, endOfWeek)) {
    const prevWeekStart = new Date(startDate);
    prevWeekStart.setDate(startDate.getDate() - 7);
    return {
      startDate: startOfWeek(prevWeekStart),
      endDate: endOfWeek(prevWeekStart),
    };
  }

  // Handle complete month
  if (isCompletePeriod(currentPeriod, startOfMonth, endOfMonth)) {
    const prevMonthStart = new Date(startDate);
    prevMonthStart.setMonth(startDate.getMonth() - 1);
    return {
      startDate: startOfMonth(prevMonthStart),
      endDate: endOfMonth(prevMonthStart),
    };
  }

  // Handle complete year
  if (isCompletePeriod(currentPeriod, startOfYear, endOfYear)) {
    const prevYearStart = new Date(startDate);
    prevYearStart.setFullYear(startDate.getFullYear() - 1);
    return {
      startDate: startOfYear(prevYearStart),
      endDate: endOfYear(prevYearStart),
    };
  }

  // Handle custom range
  const duration = differenceInDays(endDate, startDate);
  const prevStart = new Date(startDate);
  prevStart.setDate(startDate.getDate() - duration - 1);
  const prevEnd = new Date(startDate);
  prevEnd.setDate(startDate.getDate() - 1);

  return { startDate: prevStart, endDate: prevEnd };
};

// Format date range as text
const formatDateRange = (period: DateRange): string => {
  const { startDate, endDate } = period;
  if (!endDate || isOneDay(period)) {
    return format(startDate, "LLL d, yyyy");
  }
  return `${format(startDate, "LLL d, yyyy")} - ${format(endDate, "LLL d, yyyy")}`;
};

// Get period description (e.g., "3 days", "2 months", etc.)
const getPeriodDescription = (period: DateRange): string => {
  if (!period.endDate) return "day";

  const days = differenceInDays(period.endDate, period.startDate) + 1;
  const months = differenceInMonths(period.endDate, period.startDate) + 1;
  const years = differenceInYears(period.endDate, period.startDate) + 1;

  if (years > 1) return `${years.toString()} years`;
  if (months > 1) return `${months.toString()} months`;
  return `${days.toString()} days`;
};

// Create the three constants based on currentPeriod
export const createPeriod = (currentPeriod: DateRange) => {
  // Current period text
  const getCurrentPeriodText = (): string => {
    if (!currentPeriod.endDate || isOneDay(currentPeriod)) {
      if (isToday(currentPeriod.startDate)) return "today";
      if (isYesterday(currentPeriod.startDate)) return "yesterday";
      return format(currentPeriod.startDate, "LLL d, yyyy");
    }

    // Check for current complete periods
    if (isCompletePeriod(currentPeriod, startOfWeek, endOfWeek)) {
      if (isCurrentPeriod(currentPeriod, isSameWeek)) {
        return "this week";
      }
      if (isLastPeriod(currentPeriod, startOfWeek, endOfWeek, subWeeks)) {
        return "last week";
      }
    }

    if (isCompletePeriod(currentPeriod, startOfMonth, endOfMonth)) {
      if (isCurrentPeriod(currentPeriod, isSameMonth)) {
        return "this month";
      }
      if (isLastPeriod(currentPeriod, startOfMonth, endOfMonth, subMonths)) {
        return "last month";
      }
    }

    if (isCompletePeriod(currentPeriod, startOfYear, endOfYear)) {
      if (isCurrentPeriod(currentPeriod, isSameYear)) {
        return "this year";
      }
      if (isLastPeriod(currentPeriod, startOfYear, endOfYear, subYears)) {
        return "last year";
      }
    }

    return formatDateRange(currentPeriod);
  };

  // Previous period
  const previousPeriod = getPreviousPeriod(currentPeriod);

  // Previous period text
  const getPreviousPeriodText = (): string => {
    if (!previousPeriod.endDate || isOneDay(previousPeriod)) {
      return isYesterday(previousPeriod.startDate)
        ? "yesterday"
        : format(previousPeriod.startDate, "LLL d, yyyy");
    }

    if (isCompletePeriod(previousPeriod, startOfWeek, endOfWeek))
      return "previous week";
    if (isCompletePeriod(previousPeriod, startOfMonth, endOfMonth))
      return "previous month";
    if (isCompletePeriod(previousPeriod, startOfYear, endOfYear))
      return "previous year";

    return `previous ${getPeriodDescription(previousPeriod)}`;
  };

  return {
    currentPeriodText: getCurrentPeriodText(),
    previousPeriod,
    previousPeriodText: getPreviousPeriodText(),
  };
};
