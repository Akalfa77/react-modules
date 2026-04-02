// import RenderCounter from "../../shared/RenderCounter";
import ProductCard from "./ProductCard";
import React from "react";

const ProductList = React.memo(function ProductList({ products }) {

    console.log("ProductList rendered");

    return (
        <div className="product-list-section">
            <div className="product-list-header">
                <h3>Products ({products.length})</h3>
                {/* <RenderCounter name="List" /> */}
            </div>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    // onAddToCart={onAddToCart}
                    />
                ))}
            </div>
        </div>
    );
})

export default ProductList