import MemeCard from "./MemeCard";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorMessage from "./ErrorMessage";
import ScrollSentinel from "./ScrollSentinel";
import "./MemeGrid.css";

export default function MemeGrid({
    memes,
    loading,
    loadingMore,
    error,
    hasMore,
    onLoadMore,
    onRetry,
    isLiked,
    onToggleLike,
}) {
    if (loading) {
        return <LoadingSkeleton count={6} />;
    }

    if (error && memes.length === 0) {
        return <ErrorMessage message={error} onRetry={onRetry} />;
    }

    if (!loading && memes.length === 0) {
        return (
            <div className="no-memes">
                <p>No memes found right now. Try another filter.</p>
            </div>
        );
    }

    return (
        <div className="meme-grid-container">
            <div className="meme-grid">
                {memes.map((meme) => (
                    <MemeCard
                        key={meme.postLink || meme.url}
                        meme={meme}
                        isLiked={isLiked(meme.url)}
                        onToggleLike={onToggleLike}
                    />
                ))}
            </div>

            {error && memes.length > 0 && (
                <ErrorMessage message={error} onRetry={onRetry} />
            )}

            {loadingMore && (
                <div className="loading-more-skeleton">
                    <LoadingSkeleton count={3} />
                </div>
            )}

            <ScrollSentinel
                onIntersect={onLoadMore}
                hasMore={hasMore}
                loading={loadingMore}
            />
        </div>
    );
}
