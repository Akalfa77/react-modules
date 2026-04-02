import { useState, useEffect } from "react";
import { fetchProducts } from "../shared/fetchProducts";
// import RenderCounter from "../shared/RenderCounter";
// import ProductStats from "./components/ProductStats";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";
import ProductList from "./components/ProductList";
// import ThemeToggle from "./components/ThemeToggle";
import './UnoptimizedDashboard.css';

export default function UnoptimizedDashboard() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [counter, setCounter] = useState(0);
    // const [theme, setTheme] = useState("light");
    // const [cart, setCart] = useState([]);

    console.log("UnoptimizedDashboard rendered");

    useEffect(() => {
        fetchProducts()
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleSort = (sortType) => {
        setSortBy(sortType);
    };

    // const handleAddToCart = (product) => {
    //     setCart([...cart, product]);
    // };

    // const handleToggleTheme = () => {
    //     setTheme(theme === "light" ? "dark" : "light");
    // };

    const filteredProducts = products
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

    if (loading) {
        return <p className="loading-text">Loading products...</p>;
    }

    return (
        <div className={`dashboard`}>
            <div className="dashboard-header">
                <h2>Unoptimized Dashboard</h2>
                {/* <RenderCounter name="Dashboard" /> */}
            </div>

            <div className="dashboard-toolbar">
                <div className="counter-section">
                    <button
                        className="counter-btn"
                        onClick={() => setCounter(counter + 1)}
                    >
                        Counter: {counter}
                    </button>
                    {/* <p className="counter-note">
                        Click this and watch everything re-render!
                    </p> */}
                </div>


                <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

                {/* <ThemeToggle theme={theme} onToggle={handleToggleTheme} /> */}
            </div>

            {/* <div className="dashboard-controls"> */}
            <SortControls currentSort={sortBy} onSort={handleSort} />
            {/* </div> */}

            {/* <p className="cart-info">Cart Items: {cart.length}</p> */}

            <ProductList
                products={filteredProducts}
            // onAddToCart={handleAddToCart}
            />
        </div>
    );
}