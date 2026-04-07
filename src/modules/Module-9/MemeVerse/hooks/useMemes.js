import { useState, useCallback } from "react";
import { fetchMemes } from "../services/memeApi";
import { removeDuplicates, isValidImageUrl } from "../utils/helpers";

export function useMemes() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [activeSubreddit, setActiveSubreddit] = useState(null);
  const [totalLoaded, setTotalLoaded] = useState(0);
  const MAX_MEMES = 300;

  const loadInitialMemes = useCallback(async (subreddit = null) => {
    setLoading(true);
    setError(null);
    setMemes([]);

    try {
      const newMemes = await fetchMemes(subreddit, 20);
      const validMemes = newMemes.filter((meme) => isValidImageUrl(meme.url));

      setMemes(validMemes);
      setTotalLoaded(validMemes.length);
      setHasMore(true);
    } catch (err) {
      setError(err.message || "Failed to load memes. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingMore) return;
    if (!hasMore) return;
    if (error) return;

    setLoadingMore(true);
    setError(null);

    try {
      const newMemes = await fetchMemes(activeSubreddit, 20);

      const validMemes = newMemes.filter((meme) => isValidImageUrl(meme.url));

      setMemes((prevMemes) => {
        const uniqueNewMemes = removeDuplicates(prevMemes, validMemes);
        const combined = [...prevMemes, ...uniqueNewMemes];

        if (combined.length >= MAX_MEMES) {
          setHasMore(false);
        }

        return combined;
      });

      setTotalLoaded((prev) => prev + validMemes.length);
    } catch (err) {
      setError(err.message || "Failed to load more memes.");
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, error, activeSubreddit]);

  const changeSubreddit = useCallback(
    (subreddit) => {
      setActiveSubreddit(subreddit);
      setTotalLoaded(0);
      setHasMore(true);
      loadInitialMemes(subreddit);
    },
    [loadInitialMemes],
  );

  const retry = useCallback(() => {
    setError(null);
    loadInitialMemes(activeSubreddit);
  }, [activeSubreddit, loadInitialMemes]);

  return {
    memes,
    loading,
    loadingMore,
    error,
    hasMore,
    totalLoaded,
    activeSubreddit,
    loadInitialMemes,
    loadMore,
    changeSubreddit,
    retry,
  };
}
