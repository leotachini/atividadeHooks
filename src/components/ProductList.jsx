import { useDeferredValue } from 'react';

function ProductList({ products }) {
  const deferredProducts = useDeferredValue(products);
  return (
    <ul style={{display:'grid',gridTemplateColumns:"repeat(10, 1fr)", listStyleType:"none"}}>
      {deferredProducts.map((product, index) => (
        <li key={index} >{product}</li>
      ))}
    </ul>
  );
}

export default ProductList;