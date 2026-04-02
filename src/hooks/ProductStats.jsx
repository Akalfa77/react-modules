// import RenderCounter from "../../shared/RenderCounter";

export default function ProductStats({ products }) {

    console.log("ProductStats rendered");

    const stats = calculateStats(products);

    return (
        <div className="product-stats">
            <div className="stats-header">
                <h3>Product Statistics</h3>
                {/* <RenderCounter name="Stats" /> */}
            </div>
            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-label">Total Products</span>
                    <span className="stat-value">{stats.totalProducts}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Average Price</span>
                    <span className="stat-value">${stats.averagePrice}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Highest Price</span>
                    <span className="stat-value">${stats.highestPrice}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Lowest Price</span>
                    <span className="stat-value">${stats.lowestPrice}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Total Value</span>
                    <span className="stat-value">${stats.totalValue}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Avg Rating</span>
                    <span className="stat-value">{stats.averageRating}</span>
                </div>
            </div>
        </div>
    );
}

function calculateStats(products) {

    let heavyWork = 0;
    for (let i = 0; i < 20000000; i++) {
        heavyWork += Math.sqrt(i);
    }

    if (products.length === 0) {
        return {
            totalProducts: 0,
            averagePrice: "0.00",
            highestPrice: "0.00",
            lowestPrice: "0.00",
            totalValue: "0.00",
            averageRating: "0.00",
        };
    }

    const totalProducts = products.length;

    const totalValue = products.reduce((sum, p) => sum + p.price, 0);

    const averagePrice = (totalValue / totalProducts).toFixed(2);

    const highestPrice = Math.max(...products.map((p) => p.price)).toFixed(2);

    const lowestPrice = Math.min(...products.map((p) => p.price)).toFixed(2);

    const averageRating = (
        products.reduce((sum, p) => sum + p.rating, 0) / totalProducts
    ).toFixed(2);

    return {
        totalProducts,
        averagePrice,
        highestPrice,
        lowestPrice,
        totalValue: totalValue.toFixed(2),
        averageRating,
    };
}