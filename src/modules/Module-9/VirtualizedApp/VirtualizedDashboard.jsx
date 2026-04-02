import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchProducts } from "../shared/fetchProducts";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";
import VirtualizedProductList from "./components/VirtualizedProductList";
import './VirtualizedDashboard.css';

export default function VirtualizedDashboard() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [counter, setCounter] = useState(0);

    console.log("VirtualizedDashboard rendered");

    useEffect(() => {
        fetchProducts(194)
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
    }, []);

    const handleSort = useCallback((sortType) => {
        setSortBy(sortType);
    }, []);

    const filteredProducts = useMemo(() => {
        console.log("filteredProducts recalculating");

        return products
            .filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                if (sortBy === "name") return a.title.localeCompare(b.title);
                if (sortBy === "price-low") return a.price - b.price;
                if (sortBy === "price-high") return b.price - a.price;
                if (sortBy === "rating") return b.rating - a.rating;
                return 0;
            });
    }, [products, searchTerm, sortBy]);

    if (loading) {
        return <p className="loading-text">Loading products...</p>;
    }

    return (
        <div className={`dashboard`}>
            <div className="dashboard-header">
                <h2>Virtualized Dashboard ({products.length} products)</h2>
            </div>

            <div className="dashboard-toolbar">
                <div className="counter-section">
                    <button
                        className="counter-btn"
                        onClick={() => setCounter(counter + 1)}
                    >
                        Counter: {counter}
                    </button>
                </div>
                <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

            </div>

            <div className="dashboard-controls">
                <SortControls currentSort={sortBy} onSort={handleSort} />
            </div>
            <VirtualizedProductList
                products={filteredProducts}
            />
        </div>
    );
}