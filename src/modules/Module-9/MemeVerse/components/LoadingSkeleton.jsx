import './LoadingSkeleton.css';

export default function LoadingSkeleton({ count = 6 }) {

    return (
        <div className="skeleton-grid">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="skeleton-card">

                    {/* Image placeholder - biggest visual block */}
                    <div className="skeleton-image skeleton-pulse" />

                    <div className="skeleton-content">

                        {/* Title placeholder - two lines */}
                        <div className="skeleton-title skeleton-pulse" />
                        <div className="skeleton-title skeleton-pulse skeleton-title-short" />

                        {/* Meta info placeholder - author, subreddit */}
                        <div className="skeleton-meta">
                            <div className="skeleton-tag skeleton-pulse" />
                            <div className="skeleton-tag skeleton-pulse" />
                        </div>

                        {/* Action buttons placeholder */}
                        <div className="skeleton-actions">
                            <div className="skeleton-btn skeleton-pulse" />
                            <div className="skeleton-btn skeleton-pulse" />
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}