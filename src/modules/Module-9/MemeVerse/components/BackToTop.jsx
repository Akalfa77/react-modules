import { useState, useEffect } from "react";
import './BackToTop.css';

export default function BackToTop() {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        function handleScroll() {
            const scrolled = window.scrollY;
            setIsVisible(scrolled > 300);
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!isVisible) return null;

    return (
        <button
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="back-to-top-icon"
            >
                <polyline points="18 15 12 9 6 15" />
            </svg>
            <span className="back-to-top-label">Back to top</span>
        </button>
    );
}
