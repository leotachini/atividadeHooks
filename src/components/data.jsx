export function generateProducts() {
    const products = [];
    for (let i = 0; i < 2000; i++) {
      products.push(`Produto ${i+1}`);
    }
    return products;
  }

  //função que gera os produtos.