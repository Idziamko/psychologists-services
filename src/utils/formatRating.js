export const formatRating = value => Number(value).toFixed(1);

export const getInitial = name => (name ? name.trim().charAt(0) : '');
