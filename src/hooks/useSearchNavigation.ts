import { useState, useEffect, useCallback } from "react";

export function useSearchNavigation(search: string) {
  const [matchCount, setMatchCount] = useState(0);
  const [matchIndex, setMatchIndex] = useState(0);

  // Reset match index when search changes
  useEffect(() => {
    setMatchIndex(0);
  }, [search]);

  const goToNext = useCallback(() => {
    setMatchIndex((i) => (matchCount > 0 ? (i + 1) % matchCount : 0));
  }, [matchCount]);

  const goToPrev = useCallback(() => {
    setMatchIndex((i) => (matchCount > 0 ? (i - 1 + matchCount) % matchCount : 0));
  }, [matchCount]);

  return {
    matchCount,
    matchIndex,
    setMatchCount,
    currentMatch: matchCount > 0 ? matchIndex + 1 : 0,
    goToNext,
    goToPrev,
  };
}
