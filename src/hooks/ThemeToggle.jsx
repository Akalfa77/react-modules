// import RenderCounter from "../../shared/RenderCounter";

export default function ThemeToggle({ theme, onToggle }) {

    console.log("ThemeToggle rendered");

    return (
        <div className="theme-toggle">
            <button className="theme-btn" onClick={onToggle}>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
            {/* <RenderCounter name="Theme" /> */}
        </div>
    );
}