let cardContainer = document.querySelector(".card-container");
let dados = [];

async function iniciarBusca() {
    try {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados);

        const searchInput = document.getElementById("search-input");
        searchInput.addEventListener("input", buscarFilmes);

    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.ano}</p>
            <p>${dado.descrição}</p>
            <a href="${dado.link}" target="_blank"> Saiba Mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

function buscarFilmes() {
    const termoBusca = document.getElementById("search-input").value.toLowerCase();
    const filmesFiltrados = dados.filter(filme => filme.nome.toLowerCase().includes(termoBusca));
    renderizarCards(filmesFiltrados);
}

iniciarBusca();