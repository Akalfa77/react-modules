export default function ProductCard({ product }) {

    console.log(`ProductCard rendered: ${product.title}`);

    return (
        <div className="product-card">
            <img
                className="product-image"
                src={product.thumbnail}
                alt={product.title}
            />
            <div className="product-info">
                <h4 className="product-title">{product.title}</h4>
                {/* <p className="product-category">{product.category}</p> */}
                <div className="product-details">
                    <span className="product-price">{product.price}</span>
                    <span className="product-rating">{product.rating}</span>
                </div>
            </div>
            {/* <RenderCounter name={`Card-${product.id}`} /> */}
        </div>
    );
}