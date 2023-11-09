


// [ {id: xxxx,titulo: "xxxxxxx", valor:"xxxxxx,xxx"}, {id: xxxxx, titulo: "xxxxxxx", valor:"xxxxxx,xxx"}, {titulo: "xxxxxxx", valor:"xxxxxx,xxx"}]

// UUID ->  Universal Unique Identifier
// lngcq4.p71alnyc8rlq.7ncç7.1hioe12d

// Unica
// 

let carrinhoDeCompras = JSON.parse(sessionStorage.getItem("carrinho")) || [];

// if (sessionStorage.getItem("carrinho") === null) {
//     carrinhoDeCompras = []
// } else {
//     carrinhoDeCompras = JSON.parse(sessionStorage.getItem("carrinho"))
// }

window.addEventListener("load", main)

let filmes = [];

function imprimeMensagemPronta(resultadoDaPromessa) {
    console.log("Dados obtidos com sucesso!")
    return resultadoDaPromessa.json()
}


// ASYNC / AWAIT -> COnverte para promise
async function main() {
    // CONSUMIR A API DE FILMES
    const resultado = await fetch("http://localhost:3333/api/filmes")
    const converterResultadoParaJson = await resultado.json()
    
    filmes = converterResultadoParaJson
    renderizaDadosNaTela()
}

function renderizaDadosNaTela() {
    // Adicionar os filmes na div 
    const divFilmes = document.getElementById("filmes");

    for (let x = 0; x < filmes.length; x++) {
        const section = document.createElement("section");

        section.id = filmes[x].id;

        const img = document.createElement("img")
        const titulo = document.createElement("h2")
        const descricao = document.createElement("p")
        const ul = document.createElement("ul")
        const ano = document.createElement("li")
        const direcao = document.createElement("li")
        const genero = document.createElement("li")
        const valor = document.createElement("li")
        const botao = document.createElement("button")

        img.src = filmes[x].img
        img.width = '100'
        img.height = '150'

        titulo.innerText = filmes[x].titulo
        descricao.innerText = filmes[x].descricao

        ano.innerText = `Ano: ${filmes[x].ano}`
        direcao.innerText = "Direção: " + filmes[x].direcao
        genero.innerText = `Genero: ${filmes[x].genero}`
        valor.innerText = `Valor: R$ ${filmes[x].valor}`

        // botao.id = filmes[x].id

        ul.appendChild(ano)
        ul.appendChild(direcao)
        ul.appendChild(genero)
        ul.appendChild(valor)

        botao.innerText = "Adicionar ao carrinho"
        botao.addEventListener("click", adicionarElementoAoCarrinho)

        section.appendChild(img)
        section.appendChild(titulo)
        section.appendChild(descricao)
        section.appendChild(ul)
        section.appendChild(botao)

        divFilmes.appendChild(section)
        // img, p, ul, 4 li, button
    }


    // Renderize os elementos de SessionStorage no elemento HTML carrinho
    renderizarCarrinho()
    verificarBotaoFinalizarCompra()
}

// Gerar numero aleatorio

function geradorDeID(){
    return new Date().getTime().toString()
}

function renderizarCarrinho() {
    for(let x = 0; x < carrinhoDeCompras.length; x++) {
        const carrinhoItem = document.createElement("div")
        carrinhoItem.classList.add("carrinho-item")

        const paragrafo = document.createElement("p")
        const input = document.createElement("input")
        const preco = document.createElement("p")
        const botao = document.createElement("button")

        carrinhoItem.id = carrinhoDeCompras[x].id
        paragrafo.innerText = carrinhoDeCompras[x].titulo
        preco.innerText = carrinhoDeCompras[x].valor
        botao.innerText = 'X'
        botao.addEventListener("click", removerElementoDoDOM)
        input.value = 1

        carrinhoItem.appendChild(paragrafo)
        carrinhoItem.appendChild(input)
        carrinhoItem.appendChild(preco)
        carrinhoItem.appendChild(botao)

        // 4- Adicionar o novo elemento na div cuja class é carrinho.
        const carrinho = document.querySelector(".carrinho")
        carrinho.appendChild(carrinhoItem)

        const total = document.getElementById("total")
        const valorAtual = +total.innerText.replace("Total: R$ ", "").replace(",", ".")
        const valorFinal = +carrinhoDeCompras[x].valor.replace(",", ".") + valorAtual

        total.innerText = `Total: R$ ${valorFinal.toFixed(2).replace(".", ",")}`
    }

    // Obter o botão finalizar-compra e adicionar um evento de click
    const botaoFinalizarCompra = document.getElementById('finalizar-compra')
    botaoFinalizarCompra.addEventListener("click", enviaDadosParaOBackend)

}

// Envia todos os filmes do carrinho
async function enviaDadosParaOBackend() {
    // realizar um fetch com método POST, encaminhado o array de string
    const resultado = await fetch('http://localhost:3333/api/carrinho', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carrinhoDeCompras)
    })
    console.log(resultado)
}

// ADICIONAR A LÓGICA DE VERIFICAÇÃO DO BOTÃO FINALIZAR COMPRA
function adicionarElementoAoCarrinho(evento) {
    // 1- Criar um carrinho item
    const carrinhoItem = document.createElement("div")
    carrinhoItem.classList.add("carrinho-item")

    // <div class="carrinho-item"> </div>

    // 2- Obter ID do evento disparado para procurar no array de 
    // filmes qual o filme correspondente
    const sessaoId = evento.target.parentElement.id

    // Obter o objeto no array Filmes cujo id seja igual ao ID da sessão
    const filme = obterFilmeDoArray(sessaoId)

    if (filme != null) {
        // 3- Criar dinamicamente o paragrafo, input, p e button
        const paragrafo = document.createElement("p")
        const input = document.createElement("input")
        const preco = document.createElement("p")
        const botao = document.createElement("button")

        paragrafo.innerText = filme.titulo
        preco.innerText = filme.valor
        botao.innerText = 'X'
        botao.addEventListener("click", removerElementoDoDOM)
        input.value = 1

        carrinhoItem.appendChild(paragrafo)
        carrinhoItem.appendChild(input)
        carrinhoItem.appendChild(preco)
        carrinhoItem.appendChild(botao)

        // 4- Adicionar o novo elemento na div cuja class é carrinho.
        const carrinho = document.querySelector(".carrinho")
        carrinho.appendChild(carrinhoItem)

        const total = document.getElementById("total")
        const valorAtual = +total.innerText.replace("Total: R$ ", "").replace(",", ".")
        const valorFinal = +filme.valor.replace(",", ".") + valorAtual

        total.innerText = `Total: R$ ${valorFinal.toFixed(2).replace(".", ",")}`

        // Adicionar ao sessionStorage
        const car2 = {
            id: geradorDeID(),
            titulo: filme.titulo,
            valor: filme.valor
        }

        carrinhoDeCompras.push(car2)
        carrinhoItem.id = car2.id;

        sessionStorage.setItem("carrinho", JSON.stringify(carrinhoDeCompras))
    }

    // Atualizar o valor da chave carrinho do sessionStorage


    verificarBotaoFinalizarCompra()
}

function obterFilmeDoArray(id) {
    for (let x = 0; x < filmes.length; x++) {
        if (filmes[x].id == id) {
            return filmes[x]
        }
    }
    return null;
}

// ADICIONAR A LÓGICA DE VERIFICAÇÃO DO BOTÃO FINALIZAR COMPRA
function removerElementoDoDOM(evento) {
    const carrinhoItem = evento.target.parentElement
    const pCarrinhoItem = carrinhoItem.querySelectorAll("p")
    const precoCarrinhoItem = +pCarrinhoItem[1].innerText.replace(',','.')
    
    const total = document.getElementById("total")
    const valorAtual = +total.innerText.replace("Total: R$ ", "").replace(",", ".")
    const valorFinal = valorAtual - precoCarrinhoItem
    
    total.innerText = `Total: R$ ${valorFinal.toFixed(2).replace(".", ",")}`
    

    // Remover o elemento do array de carrinho
    const novoCarrinho = removerItemDoCarrinhoPorID(carrinhoItem.id)
    carrinhoDeCompras = novoCarrinho

    // Atualizar o sessionStorage
    sessionStorage.setItem("carrinho", JSON.stringify(novoCarrinho))

    // Remove o elemento do DOM
    carrinhoItem.remove()

    verificarBotaoFinalizarCompra()
}

function removerItemDoCarrinhoPorID(id) {
    const carrihoTemp = []
    for (let x = 0; x < carrinhoDeCompras.length; x++) {
        if (id !== carrinhoDeCompras[x].id) {
            carrihoTemp.push(carrinhoDeCompras[x])
        }
    }
    return carrihoTemp;
}

function verificarBotaoFinalizarCompra(){
    const listaDeCarrinhoItem = document.querySelectorAll('.carrinho-item');
    const botaoFinalizar = document.getElementById("finalizar-compra");

    if (listaDeCarrinhoItem.length != 0){
        // Mudar a classe do botão finalizar compra
        if (botaoFinalizar.classList.length === 0) {
            console.log("Modificando classe do botão finalizar compra")
            botaoFinalizar.classList.add("finalizar-compra")
            botaoFinalizar.disabled = false
        }
    } else {
        // Removo a classe finalizar compra
        botaoFinalizar.classList.remove("finalizar-compra")
        botaoFinalizar.disabled = true
    }
}
