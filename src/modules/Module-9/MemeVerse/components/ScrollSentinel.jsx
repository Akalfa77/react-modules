import { useEffect, useRef } from "react";
import './ScrollSentinel.css';

export default function ScrollSentinel({ onIntersect, hasMore, loading }) {

    const sentinelRef = useRef(null);

    useEffect(() => {

        if (!hasMore || loading || !sentinelRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const sentinel = entries[0];
                if (sentinel.isIntersecting) {
                    onIntersect();
                }
            },
            {
                rootMargin: "0px 0px 100px 0px",
                threshold: 0.1,
            }
        );

        const currentSentinel = sentinelRef.current;
        observer.observe(currentSentinel);

        return () => {
            observer.disconnect();
        };

    }, [onIntersect, hasMore, loading]);

    if (!hasMore) {
        return (
            <div className="sentinel-end">
                <p>You have reached the end! No more memes to load.</p>
            </div>
        );
    }

    return (
        <div
            ref={sentinelRef}
            className="scroll-sentinel"
            aria-hidden="true"
        />
    );
}