import { challengeDays } from './challengeDays';

export type DailyDevotion = {
  day: number;
  title: string;
  focus: string;
  scriptureReference: string;
  reflectionQuestions: string[];
  actionStep: string;
};

function getDayOfYear(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  return Math.floor((startOfDay.getTime() - startOfYear.getTime()) / millisecondsPerDay) + 1;
}

export function getDailyDevotionForDate(date = new Date()): DailyDevotion {
  const dayIndex = (getDayOfYear(date) - 1) % challengeDays.length;
  const challenge = challengeDays[dayIndex];

  return {
    day: challenge.day,
    title: challenge.characteristic,
    focus: challenge.focus,
    scriptureReference: challenge.scriptureReference,
    reflectionQuestions: challenge.reflectionQuestions,
    actionStep: `Choose one way to practice ${challenge.characteristic.toLowerCase()} before the day ends.`,
  };
}
