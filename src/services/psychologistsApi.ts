import {
  endBefore,
  get,
  limitToFirst,
  limitToLast,
  orderByChild,
  orderByKey,
  query,
  ref,
  startAfter,
  type DataSnapshot,
  type QueryConstraint,
} from 'firebase/database';
import { database } from '../firebase/config';
import type {
  PageCursor,
  Psychologist,
  PsychologistsPage,
  SortOption,
  SortValue,
} from '../types/psychologist';

export const PAGE_SIZE = 3;

export const SORT_OPTIONS: SortOption[] = [
  { value: 'a-z', label: 'A to Z' },
  { value: 'z-a', label: 'Z to A' },
  { value: 'price-low', label: 'Less than 10$' },
  { value: 'price-high', label: 'Greater than 10$' },
  { value: 'popular', label: 'Popular' },
  { value: 'not-popular', label: 'Not popular' },
  { value: 'show-all', label: 'Show all' },
];

type SortField = 'name' | 'price_per_hour' | 'rating' | null;

interface SortRule {
  field: SortField;
  direction: 'asc' | 'desc';
}

const SORT_RULES: Record<SortValue, SortRule> = {
  'a-z': { field: 'name', direction: 'asc' },
  'z-a': { field: 'name', direction: 'desc' },
  'price-low': { field: 'price_per_hour', direction: 'asc' },
  'price-high': { field: 'price_per_hour', direction: 'desc' },
  popular: { field: 'rating', direction: 'desc' },
  'not-popular': { field: 'rating', direction: 'asc' },
  'show-all': { field: null, direction: 'asc' },
};

const snapshotToList = (snapshot: DataSnapshot): Psychologist[] => {
  const list: Psychologist[] = [];

  snapshot.forEach(child => {
    list.push({ id: child.key as string, ...child.val() });
  });

  return list;
};

export const fetchPsychologistsPage = async (
  sortValue: SortValue,
  cursor: PageCursor | null
): Promise<PsychologistsPage> => {
  const { field, direction } = SORT_RULES[sortValue] ?? SORT_RULES['show-all'];
  const constraints: QueryConstraint[] = [
    field ? orderByChild(field) : orderByKey(),
  ];

  if (direction === 'asc') {
    if (cursor) {
      constraints.push(
        field ? startAfter(cursor.value, cursor.id) : startAfter(cursor.id)
      );
    }
    constraints.push(limitToFirst(PAGE_SIZE));
  } else {
    if (cursor) {
      constraints.push(
        field ? endBefore(cursor.value, cursor.id) : endBefore(cursor.id)
      );
    }
    constraints.push(limitToLast(PAGE_SIZE));
  }

  const snapshot = await get(
    query(ref(database, 'psychologists'), ...constraints)
  );
  const items = snapshotToList(snapshot);
  const page = direction === 'asc' ? items : items.reverse();
  const last = page[page.length - 1];

  return {
    items: page,
    cursor: last ? { id: last.id, value: field ? last[field] : last.id } : null,
    hasMore: page.length === PAGE_SIZE,
  };
};

export const fetchPsychologistsByIds = async (
  ids: string[]
): Promise<Psychologist[]> => {
  const snapshots = await Promise.all(
    ids.map(id => get(ref(database, `psychologists/${id}`)))
  );

  return snapshots
    .filter(snapshot => snapshot.exists())
    .map(snapshot => ({ id: snapshot.key as string, ...snapshot.val() }));
};
