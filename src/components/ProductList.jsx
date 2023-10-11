import { useDeferredValue } from "react";

function ProductList({ products }) {
  const deferredProducts = useDeferredValue(products);
  
  return (
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(10, 1fr)",
        listStyleType: "none",
      }}
    >
      {deferredProducts.map((product, index) => (
        <li key={index}>{product}</li>
      ))}
    </ul>
  );
}
//o useDeferredValue é um hook que permite que você adie a atualização de um valor, ou seja, ele permite o adiamento da atualização de um estado.
export default ProductList;
