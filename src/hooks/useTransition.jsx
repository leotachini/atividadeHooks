import { useState, useTransition } from "react";
import { generateProducts } from "./../components/data";
import ProductList from "./../components/ProductList";

const dummyProducts = generateProducts();
//função que chama os produtos vinda do componente data.jsx

//função que filtra os produtos
function filterProducts(filterTerm) {
  if (!filterTerm) {
    return dummyProducts;
  }
  return dummyProducts.filter((product) => product.includes(filterTerm));
}
//O useTransition é um hook que permite que você execute uma função de transição de forma assíncrona, ou seja, sem bloquear a thread principal do JavaScript.

function App() {
  const [isPending, startTransition] = useTransition();
  const [filterTerm, setFilterTerm] = useState("");

  //filteredProducts é uma variável que recebe o retorno da função filterProducts
  const filteredProducts = filterProducts(filterTerm);

  function updateFilterHandler(event) {
    startTransition(() => {
      setFilterTerm(event.target.value);
    });
    setFilterTerm(event.target.value);
  }
  //O startTransition é uma função que recebe uma função como argumento, e essa função é executada de forma assíncrona, ou seja, ela não bloqueia a
  //thread principal do JavaScript, e por isso, o React pode interromper a execução dessa função a qualquer momento, caso o usuário interaja com a aplicação.

  return (
    <div id="app">
      <input
        type="text"
        style={{ justifyContent: "center" }}
        onChange={updateFilterHandler}
      />
      {isPending && <p style={{ color: "orange" }}>Updating List...</p>}
      <ProductList products={filteredProducts} />
    </div>
  );
}
//O isPending é um booleano que indica se a transição está em andamento ou não, quando ele é verdadeiro, o componente está em um estado de transição, e quando é falso, a transição terminou.

export default App;
