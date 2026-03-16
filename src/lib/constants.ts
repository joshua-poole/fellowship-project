export const ROW_HEIGHT = 32;

/** Progressive page size limits — each page fetches more rows as the user scrolls deeper. */
export const PAGE_LIMITS = [10000, 90000, 100000] as const;
