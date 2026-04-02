import './about8.css';


export default function About8() {
    return (
        <div className="about8-container">
            <h2 className="about8-title">About This App</h2>

            <div className="about8-card">
                <p className="about8-description">
                    This application demonstrates React 19's new <code>use()</code> hook
                    for data fetching. Instead of the traditional <code>useEffect + useState</code>
                    pattern, we use <code>use()</code> with <code>Suspense</code> for a cleaner
                    approach.
                </p>

                <div className="about8-features">
                    <h3>Key Features:</h3>
                    <ul>
                        <li>
                            <strong>use() Hook</strong> — Reads data from Promises directly
                            inside components
                        </li>
                        <li>
                            <strong>Suspense</strong> — Shows loading fallback automatically
                            while data is being fetched
                        </li>
                        <li>
                            <strong>startTransition()</strong> — Prevents UI freeze during
                            data refetching
                        </li>
                        <li>
                            <strong>React Router</strong> — SPA navigation without page reloads
                        </li>
                    </ul>
                </div>

                <div className="about8-tech">
                    <h3>Technologies Used:</h3>
                    <div className="tech-tags">
                        <span className="tech-tag">React 19</span>
                        <span className="tech-tag">React Router</span>
                        <span className="tech-tag">Vite</span>
                        <span className="tech-tag">JavaScript</span>
                    </div>
                </div>
            </div>
        </div>
    );
}