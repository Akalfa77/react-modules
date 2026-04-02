// import RenderCounter from "../../shared/RenderCounter";

export default function SearchBar({ searchTerm, onSearch }) {

    console.log("SearchBar rendered");

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
            />
            {/* <RenderCounter name="Search" /> */}
        </div>
    );
}