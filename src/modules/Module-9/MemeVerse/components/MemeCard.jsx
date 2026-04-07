import React from "react";
import { formatNumber, truncateText } from "../utils/helpers";
import './MemeCard.css';

const MemeCard = React.memo(function MemeCard({ meme, isLiked, onToggleLike }) {

    console.log(`MemeCard rendered: ${meme.title}`);

    return (
        <div className="meme-card">

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

                <span className="meme-subreddit-tag">
                    r/{meme.subreddit}
                </span>
            </div>

            <div className="meme-content">

                <h3 className="meme-title">
                    {truncateText(meme.title, 80)}
                </h3>

                <div className="meme-meta">
                    <div className="meme-author">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="meta-icon"
                        >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>{meme.author}</span>
                    </div>

                    <div className="meme-ups">
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
                        <span>{formatNumber(meme.ups)}</span>
                    </div>
                </div>

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
        </div>
    );
});

export default MemeCard;