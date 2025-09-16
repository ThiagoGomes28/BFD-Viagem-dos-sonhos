let carrinho = [];

function adicionarProduto(nome, preco) {
    let produto = carrinho.find(item => item.nome === nome);
    if (produto) {
        produto.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }
    atualizarCarrinho();
}

function aumentarQuantidade(nome) {
    let produto = carrinho.find(item => item.nome === nome);
    if (produto) {
        produto.quantidade++;
    }
    atualizarCarrinho();
}

function diminuirQuantidade(nome) {
    let produto = carrinho.find(item => item.nome === nome);
    if (produto) {
        produto.quantidade--;
        if (produto.quantidade <= 0) {
            carrinho = carrinho.filter(item => item.nome !== nome);
        }
    }
    atualizarCarrinho();
}

function atualizarCarrinho() {
    let lista = document.getElementById("lista-carrinho");
    let total = 0;
    lista.innerHTML = "";

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        lista.innerHTML +=`
        <div class="item-carrinho">
            <span>${item.nome}(X${item.quantidade})</span>
            <span>R$ ${item.preco * item.quantidade}</span>
        <div>
            <button class="btn-mais" onclick="aumentarQuantidade('${item.nome}')">+</button>
            <button class="btn-menos" onclick="diminuirQuantidade('${item.nome}')">-</button>
        </div>
        </div>`;
    });

    document.getElementById("total").textContent = total;
}