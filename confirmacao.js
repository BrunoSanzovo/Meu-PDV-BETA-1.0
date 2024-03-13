document.addEventListener("DOMContentLoaded", function() {
    const orderDetails = document.getElementById("orderDetails");

    // Recupera os produtos do localStorage
    const carrinhoArmazenado = localStorage.getItem('carrinho');
    if (carrinhoArmazenado) {
        const carrinho = JSON.parse(carrinhoArmazenado);
        exibirDetalhesCompra(carrinho);
    } else {
        orderDetails.innerHTML = "<p>Nenhum item encontrado.</p>";
    }

    function exibirDetalhesCompra(carrinho) {
        // Cria uma lista de itens adquiridos
        const itemList = document.createElement("ul");

        carrinho.forEach(function(item) {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.nome}: R$ ${item.preco.toFixed(2)}`;
            itemList.appendChild(listItem);
        });

        // Calcula o total da compra
        const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

        // Cria um parágrafo para exibir o total da compra
        const totalParagraph = document.createElement("p");
        totalParagraph.textContent = `Total: R$ ${total.toFixed(2)}`;

        // Adiciona os elementos à seção de detalhes do pedido
        orderDetails.appendChild(itemList);
        orderDetails.appendChild(totalParagraph);
    }
});
