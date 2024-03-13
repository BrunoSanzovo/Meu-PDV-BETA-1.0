document.addEventListener("DOMContentLoaded", function() {
    const produtos = {
        "cenoura": 3.99,
        "batata": 9.99,
        "coca-cola": 10.99,
        "Arroz": 5.99,
        "Feijão": 3.99,
        "Macarrão": 2.49,
        "Óleo de Soja": 4.50,
        "Açúcar": 3.29,
        "Café": 8.99,
        "Leite": 2.79,
        "Pão": 3.49,
        "Banana": 1.99,
        "Maçã": 2.49
    };

    const productList = document.getElementById("productList");
    const cartList = document.getElementById("cartList");
    const totalSpan = document.getElementById("total");
    const numeroItensSpan = document.getElementById("numeroItens");
    let carrinho = [];
    let numeroItensCarrinho = 0;

    // Recupera os produtos do localStorage ao carregar a página
    const carrinhoArmazenado = localStorage.getItem('carrinho');
    if (carrinhoArmazenado) {
        carrinho = JSON.parse(carrinhoArmazenado);
        atualizarCarrinho();
    }

    for (const produto in produtos) {
        const preco = produtos[produto];
        const listItem = document.createElement("div");
        listItem.textContent = `${produto}: R$ ${preco.toFixed(2)}`;
        listItem.classList.add("product-item");

        const buyButton = document.createElement("button");
        buyButton.textContent = "Comprar";
        buyButton.addEventListener("click", function() {
            adicionarAoCarrinho(produto, preco);
        });

        listItem.appendChild(buyButton);
        productList.appendChild(listItem);
    }
    
    function adicionarAoCarrinho(produto, preco) {
        carrinho.push({ nome: produto, preco: preco });
        atualizarCarrinho();
        numeroItensCarrinho++; // Incrementa o número total de itens
        atualizarNumeroItensCarrinho(); // Atualiza a exibição do número de itens na interface
        // Armazena os produtos no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    function removerDoCarrinho(index) {
        carrinho.splice(index, 1);
        atualizarCarrinho();
        numeroItensCarrinho--; // Decrementa o número total de itens
        atualizarNumeroItensCarrinho(); // Atualiza a exibição do número de itens na interface
        // Atualiza os produtos no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    function atualizarCarrinho() {
        cartList.innerHTML = '';
        let totalCompra = 0;

        carrinho.forEach(function(produto, index) {
            const listItem = document.createElement("li");
            listItem.textContent = `${produto.nome}: R$ ${produto.preco.toFixed(2)}`;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remover";
            removeButton.addEventListener("click", function() {
                removerDoCarrinho(index);
            });

            listItem.appendChild(removeButton);
            cartList.appendChild(listItem);
            totalCompra += produto.preco;
        });

        totalSpan.textContent = totalCompra.toFixed(2);
    }

    function atualizarNumeroItensCarrinho() {
        numeroItensSpan.textContent = numeroItensCarrinho;
    }

    function checkout() {
        alert(`Total da compra: R$ ${totalSpan.textContent}`);
    }

    function limparCarrinho() {
        carrinho = [];
        atualizarCarrinho();
        numeroItensCarrinho = 0; // Zera o número total de itens
        atualizarNumeroItensCarrinho(); // Atualiza a exibição do número de itens na interface
        localStorage.removeItem('carrinho'); 
    }
    

    
    const limparCarrinhoButton = document.getElementById("limparCarrinhoButton");
    limparCarrinhoButton.addEventListener("click", limparCarrinho);
});
