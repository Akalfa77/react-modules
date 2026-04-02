import ProductCard from './ProductCard'
import speaker from './assets/speaker_image.webp'
import './ProductCard.css'


function ProductModule() {

  const products = [
    {
      id: 1,
      imageURL: speaker,
      name: 'Product 1',
      price: '$20.00',
      description: 'This is a description for Product 1.',
    },
    {
      id: 2,
      imageURL: speaker,
      name: 'Product 2',
      price: '$10.00',
      description: 'This is a description for Product 1.',
    },
    {
      id: 3,
      imageURL: speaker,
      name: 'Product 3',
      price: '$30.00',
      description: 'This is a description for Product 1.',
    }
  ]
  return (
    <>

      {products.map(product => (<ProductCard key={product.id} product={product} />))}

      {/* <ProductCard product={products[0]} />
      <ProductCard product={products[1]} />
      <ProductCard product={products[2]} /> */}
    </>
  )
}

export default ProductModule
