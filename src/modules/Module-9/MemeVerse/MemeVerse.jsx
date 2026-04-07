import { useEffect, useCallback } from "react";
import { useMemes } from "./hooks/useMemes";
import { useLikes } from "./hooks/useLikes";
import MemeFilter from "./components/MemeFilter";
import MemeGrid from "./components/MemeGrid";
import BackToTop from "./components/BackToTop";
import './MemeVerse.css';

export default function MemeVerse() {

    const {
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
    } = useMemes();

    const { isLiked, toggleLike, likeCount } = useLikes();
    useEffect(() => {
        loadInitialMemes(null);
    }, [loadInitialMemes]);

    const handleToggleLike = useCallback((url) => {
        toggleLike(url);
    }, [toggleLike]);

    const handleSubredditChange = useCallback((subreddit) => {
        changeSubreddit(subreddit);
    }, [changeSubreddit]);

    return (
        <div className="memeverse-container">
            <div className="memeverse-header">
                <div className="memeverse-title-group">
                    <p className="memeverse-kicker">Social Feed</p>
                    <h2 className="memeverse-title">MemeVerse</h2>
                    <p className="memeverse-subtitle">
                        A scroll-first meme feed with bigger visuals, cleaner captions, and a more social-media feel.
                    </p>
                </div>

                <div className="memeverse-stats">
                    <span className="stat-item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="stat-icon"
                        >
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                        {totalLoaded} memes loaded
                    </span>

                    <span className="stat-item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="stat-icon stat-icon-liked"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        {likeCount} liked
                    </span>
                </div>
            </div>

            <MemeFilter
                activeSubreddit={activeSubreddit}
                onSubredditChange={handleSubredditChange}
            />

            <MemeGrid
                memes={memes}
                loading={loading}
                loadingMore={loadingMore}
                error={error}
                hasMore={hasMore}
                onLoadMore={loadMore}
                onRetry={retry}
                isLiked={isLiked}
                onToggleLike={handleToggleLike}
            />

            <BackToTop />
        </div>
    );
}
