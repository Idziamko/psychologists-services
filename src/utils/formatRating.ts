export const formatRating = (value: number): string => Number(value).toFixed(1);

export const getInitial = (name: string): string =>
  name ? name.trim().charAt(0) : '';
