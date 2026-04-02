import React from 'react'
import './ProductCard.css'


function ProductCard({ product }) {

    // const handleClick = () => {
    //     console.log(product);
    // }
    const { name, imageURL, price, description } = product || {};

    return (
        <>
            <div className='product-info'
            // onClick={handleClick}
            >
                <h2>{name}</h2>
                <img src={imageURL} alt={name} />
                <p>{description}</p>
                <span><b>{price}</b></span>
                <hr />
            </div>
        </>
    )
}

export default ProductCard
