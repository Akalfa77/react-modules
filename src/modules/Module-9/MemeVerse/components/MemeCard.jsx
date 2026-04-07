import React from "react";
import { formatNumber } from "../utils/helpers";
import './MemeCard.css';

const MemeCard = React.memo(function MemeCard({ meme, isLiked, onToggleLike }) {
    const postDate = meme.createdUtc
        ? new Date(meme.createdUtc * 1000).toLocaleDateString()
        : null;

    return (
        <article className="meme-card">
            <div className="meme-post-header">
                <div className="meme-post-identity">
                    <div className="meme-avatar">
                        {(meme.subreddit || "m").slice(0, 1).toUpperCase()}
                    </div>

                    <div className="meme-post-meta">
                        <p className="meme-post-name">r/{meme.subreddit}</p>
                        <p className="meme-post-submeta">
                            Posted by u/{meme.author}
                            {postDate ? ` � ${postDate}` : ""}
                        </p>
                    </div>
                </div>

                <a
                    className="meme-open-link"
                    href={meme.postLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Open post
                </a>
            </div>

            <div className="meme-image-wrapper">
                <img
                    className="meme-image"
                    src={meme.url}
                    alt={meme.title}
                    loading="lazy"
                    onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.classList.add("image-error");
                    }}
                />
            </div>

            <div className="meme-content">
                <div className="meme-meta">
                    <div className="meme-meta-pill">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="meta-icon"
                        >
                            <polyline points="18 15 12 9 6 15" />
                        </svg>
                        <span>{formatNumber(meme.ups)} likes</span>
                    </div>

                    <div className="meme-meta-pill">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="meta-icon"
                        >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>{meme.preview ? `${meme.preview.length} preview${meme.preview.length > 1 ? "s" : ""}` : "Meme post"}</span>
                    </div>
                </div>

                <h3 className="meme-title">{meme.title}</h3>

                <p className="meme-caption">
                    <span className="meme-caption-author">u/{meme.author}</span>{" "}
                    shared this from <span className="meme-caption-subreddit">r/{meme.subreddit}</span>.
                    Tap open post if you want the original Reddit thread.
                </p>

                <div className="meme-actions">
                    <button
                        className={`meme-like-btn ${isLiked ? "meme-like-btn-active" : ""}`}
                        onClick={() => onToggleLike(meme.url)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={isLiked ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                            className="action-icon"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        {isLiked ? "Liked" : "Like"}
                    </button>

                    <a
                        className="meme-view-btn"
                        href={meme.postLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="action-icon"
                        >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        View Post
                    </a>
                </div>
            </div>
        </article>
    );
});

export default MemeCard;
