import type { Psychologist, SortValue } from '../types/psychologist';

type Comparator = (first: Psychologist, second: Psychologist) => number;

const COMPARATORS: Partial<Record<SortValue, Comparator>> = {
  'a-z': (first, second) => first.name.localeCompare(second.name),
  'z-a': (first, second) => second.name.localeCompare(first.name),
  'price-low': (first, second) => first.price_per_hour - second.price_per_hour,
  'price-high': (first, second) => second.price_per_hour - first.price_per_hour,
  popular: (first, second) => second.rating - first.rating,
  'not-popular': (first, second) => first.rating - second.rating,
};

export const sortPsychologists = (
  items: Psychologist[],
  sortValue: SortValue
): Psychologist[] => {
  const comparator = COMPARATORS[sortValue];
  return comparator ? [...items].sort(comparator) : items;
};
