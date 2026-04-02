import React, { useRef } from "react";
import { FixedSizeList } from "react-window";
import ProductCard from "./ProductCard";
import { useContainerHeight } from "../../shared/useContainerHeight";
import { useResponsiveItemSize } from "../../shared/useResponsiveItemSize";

const VirtualizedProductList = React.memo(function VirtualizedProductList({ products }) {

    console.log("Virtualized ProductList rendered");

    const containerRef = useRef(null);

    const height = useContainerHeight(containerRef)
    const itemSize = useResponsiveItemSize()

    return (
        <div className="product-list-section" ref={containerRef}>
            <div className="product-list-header">
                <h3>Products ({products.length})</h3>
            </div>


            <FixedSizeList
                height={height}
                width="100%"
                itemCount={products.length}
                itemSize={itemSize}
            >
                {({ index, style }) => {
                    const product = products[index];

                    return (
                        <ProductCard
                            product={product}
                            style={style}
                        />
                    );
                }}
            </FixedSizeList >
        </div>
    );
});

export default VirtualizedProductList;