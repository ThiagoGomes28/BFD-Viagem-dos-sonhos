
const produtos = [
    { nome: "Camiseta", preco: 50, destaque: true, img: "./imagens/camiseta.jpg?text=Camiseta" },
    { nome: "Tênis", preco: 200, destaque: false, img: "./imagens/tenis.jpg?text=Tenis" },
    { nome: "Boné", preco: 40, destaque: true, img: "./imagens/bone.jpg?text=Bone" },
    { nome: "Óculos", preco: 120, destaque: false, img: "./imagens/oculos.jpg?text=Oculos" },
    { nome: "Relógio", preco: 300, destaque: true, img: "./imagens/relogio.jpg?text=Relogio" }
];

const container = document.getElementById("lista-produtos");
const filtroSelect = document.getElementById("filtro");

function exibirProdutos(lista) {
    container.innerHTML = "";
    lista.forEach(p => {
        container.innerHTML += `
          <div class="card">
            <img src="${p.img}" alt="${p.nome}">
            <h3>${p.nome}</h3>
            <p class="preco">R$ ${p.preco}</p>
            ${p.destaque ? "<p>🌟 Destaque</p>" : ""}
          </div>
        `;
    });
}

filtroSelect.addEventListener("change", () => {
    let produtosFiltrados = [...produtos];
    switch (filtroSelect.value) {
        case "az":
            produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
            break;
        case "destaque":
            produtosFiltrados = produtosFiltrados.filter(p => p.destaque);
            break;
        case "menor":
            produtosFiltrados.sort((a, b) => a.preco - b.preco);
            break;
        case "maior":
            produtosFiltrados.sort((a, b) => b.preco - a.preco);
            break;
        default:
            produtosFiltrados = produtos;
    }
    exibirProdutos(produtosFiltrados);
});

exibirProdutos(produtos);
