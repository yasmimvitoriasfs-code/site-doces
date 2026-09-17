// ========================================
// CARRINHO
// ========================================

let carrinho = [];


// ========================================
// ADICIONAR PRODUTO
// ========================================

function adicionarCarrinho(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    abrirCarrinho();
}


// ========================================
// ATUALIZAR CARRINHO
// ========================================

function atualizarCarrinho() {

    const lista = document.getElementById("listaCarrinho");

    const contador = document.getElementById("contador");

    const totalElemento = document.getElementById("total");


    // Limpa a lista

    lista.innerHTML = "";


    let total = 0;


    // Se não tiver produtos

    if (carrinho.length === 0) {

        lista.innerHTML = `
            <p style="text-align:center; margin-top:30px;">
                Seu carrinho está vazio 🍰
            </p>
        `;

    }


    // Cria cada produto

    carrinho.forEach(function(produto, index) {

        total += produto.preco;


        const item = document.createElement("div");

        item.classList.add("item-carrinho");


        item.innerHTML = `

            <div>

                <strong>
                    ${produto.nome}
                </strong>

                <br>

                R$ ${produto.preco.toFixed(2).replace(".", ",")}

            </div>


            <button
                class="remover"
                onclick="removerProduto(${index})">

                ✕

            </button>

        `;


        lista.appendChild(item);

    });


    // Atualiza contador

    contador.textContent = carrinho.length;


    // Atualiza preço

    totalElemento.textContent =
        total.toFixed(2).replace(".", ",");

}


// ========================================
// REMOVER PRODUTO
// ========================================

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


// ========================================
// ABRIR CARRINHO
// ========================================

function abrirCarrinho() {

    document.getElementById("carrinho").style.display = "flex";

}


// ========================================
// FECHAR CARRINHO
// ========================================

function fecharCarrinho() {

    document.getElementById("carrinho").style.display = "none";

}


// ========================================
// FILTRAR PRODUTOS
// ========================================

function filtrar(categoria) {

    const produtos =
        document.querySelectorAll(".produto");


    produtos.forEach(function(produto) {

        const categoriaProduto =
            produto.getAttribute("data-categoria");


        if (
            categoria === "todos" ||
            categoriaProduto === categoria
        ) {

            produto.style.display = "block";

        } else {

            produto.style.display = "none";

        }

    });

}


// ========================================
// FINALIZAR PEDIDO
// ========================================

function finalizarPedido() {

    // Verifica se está vazio

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio! 🍰"
        );

        return;

    }


    // Número do confeiteiro

    const telefone = "5512992590928";


    // Começo da mensagem

    let mensagem =
        "Olá! Gostaria de fazer um pedido! 🍰\n\n";


    let total = 0;


    // Adiciona os produtos

    carrinho.forEach(function(produto) {

        mensagem +=
            "🍰 " +
            produto.nome +
            " - R$ " +
            produto.preco
                .toFixed(2)
                .replace(".", ",") +
            "\n";


        total += produto.preco;

    });


    // Adiciona o total

    mensagem +=
        "\n💰 Total: R$ " +
        total.toFixed(2).replace(".", ",");


    // Transforma a mensagem para URL

    const mensagemCodificada =
        encodeURIComponent(mensagem);


    // Cria o link do WhatsApp

    const url =
        "https://wa.me/" +
        telefone +
        "?text=" +
        mensagemCodificada;


    // Abre o WhatsApp

    window.open(url, "_blank");

}