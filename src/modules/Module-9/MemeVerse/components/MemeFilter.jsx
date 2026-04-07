import './MemeFilter.css';

const SUBREDDITS = [
    { label: "All", value: null },
    { label: "Memes", value: "memes" },
    { label: "Dank Memes", value: "dankmemes" },
    { label: "Programmer Humor", value: "ProgrammerHumor" },
    { label: "Wholesome", value: "wholesomememes" },
];

export default function MemeFilter({ activeSubreddit, onSubredditChange }) {

    return (
        <div className="meme-filter">
            <span className="filter-label">Browse:</span>

            <div className="filter-buttons">
                {SUBREDDITS.map((subreddit) => (
                    <button
                        key={subreddit.label}
                        className={`filter-btn ${activeSubreddit === subreddit.value ? "filter-btn-active" : ""}`}
                        onClick={() => onSubredditChange(subreddit.value)}
                    >
                        {subreddit.label}
                    </button>
                ))}
            </div>
        </div>
    );
}