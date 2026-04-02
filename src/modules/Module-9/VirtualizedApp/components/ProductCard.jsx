import React from "react";

const ProductCard = React.memo(function ProductCard({ product, style }) {

    console.log(`Virtualized ProductCard rendered: ${product.title}`);

    return (
        <div style={style}>
            <div className="product-card-virtual">
                <img
                    className="product-image-virtual"
                    src={product.thumbnail}
                    alt={product.title}
                />
                <div className="product-info">
                    <h4 className="product-title">{product.title}</h4>
                    <div className="product-details">
                        <span className="product-price">${product.price}</span>
                        <span className="product-rating">{product.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProductCard;