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


function finalizarPedido() {

    // ========================================
    // VERIFICAR CARRINHO
    // ========================================

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio! 🍰");

        return;
    }


    // ========================================
    // PEGAR DADOS DO CLIENTE
    // ========================================

    const nome =
        document.getElementById("nomeCliente").value.trim();

    const pagamento =
        document.getElementById("pagamento").value;

    const endereco =
        document.getElementById("endereco").value.trim();


    // ========================================
    // VERIFICAR PREENCHIMENTO
    // ========================================

    if (nome === "") {

        alert("Digite seu nome antes de finalizar o pedido! 😊");

        return;
    }


    if (pagamento === "") {

        alert("Escolha uma forma de pagamento! 💳");

        return;
    }


    if (endereco === "") {

        alert("Digite o local de entrega! 📍");

        return;
    }


    // ========================================
    // NÚMERO DO WHATSAPP
    // ========================================

    const telefone = "5512988808036";


    // ========================================
    // MONTAR PEDIDO
    // ========================================

    let mensagem =
        "🍰 *NOVO PEDIDO - Sunny Doces* 🍰\n\n";


    mensagem +=
        "👤 *Cliente:* " +
        nome +
        "\n\n";


    mensagem +=
        "📦 *Produtos:*\n";


    let total = 0;


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


    // ========================================
    // TOTAL
    // ========================================

    mensagem +=
        "\n💰 *Total:* R$ " +
        total.toFixed(2).replace(".", ",");


    // ========================================
    // PAGAMENTO
    // ========================================

    mensagem +=
        "\n\n💳 *Forma de pagamento:* " +
        pagamento;


    // ========================================
    // ENTREGA
    // ========================================

    mensagem +=
        "\n\n📍 *Local de entrega:* " +
        endereco;


    // ========================================
    // ABRIR WHATSAPP
    // ========================================

    const mensagemCodificada =
        encodeURIComponent(mensagem);


    const url =
        "https://wa.me/" +
        const telefone +
        "?text=" +
        mensagemCodificada;


    window.open(url, "_blank");

}
