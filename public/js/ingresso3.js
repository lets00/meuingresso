window.addEventListener("load", main)

let filmes = []

let car = JSON.parse(sessionStorage.getItem("carrinho")) || [];

async function main() {
    // Adicionar os filmes na div 
    const divFilmes = document.getElementById("filmes");
    // const f = fetch('http://localhost:3000/api/filmes')
    // .then(response => {
    //     return response.json()
    // })
    // .then(data => {
    //     console.log(data);
    // })
    const response = await fetch('http://localhost:3000/api/filmes')
    const data = await response.json()
    filmes = data

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

    // Adicionar acao do botao finalizar compra
    const botao = document.getElementById('finalizar-compra');
    botao.addEventListener('click', finalizarCompra)

    renderizarCarrinho()
    verificarFinalizarCompra()

}

async function finalizarCompra(event) {
    console.log("Finalizar compra")
    const result = await fetch('http://localhost:3000/api/compras', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(car)
    })

    console.log(result)
}

function renderizarCarrinho() {
    for (let x = 0; x < car.length; x++) {
        const carrinhoItem = document.createElement("div")
        carrinhoItem.classList.add("carrinho-item")

        const paragrafo = document.createElement("p")
        const input = document.createElement("input")
        const preco = document.createElement("p")
        const botao = document.createElement("button")

        paragrafo.innerText = car[x].titulo
        preco.innerText = car[x].valor
        botao.innerText = 'X'
        botao.addEventListener("click", removerElementoDoDOM)
        input.value = 1

        carrinhoItem.appendChild(paragrafo)
        carrinhoItem.appendChild(input)
        carrinhoItem.appendChild(preco)
        carrinhoItem.appendChild(botao)

        const carrinho = document.querySelector(".carrinho")
        carrinho.appendChild(carrinhoItem)

        const total = document.getElementById("total")
        const valorAtual = +total.innerText.replace("Total: R$ ", "").replace(",", ".")
        const valorFinal = +car[x].valor.replace(",", ".") + valorAtual

        total.innerText = `Total: R$ ${valorFinal.toFixed(2).replace(".", ",")}`
    }

}


function calculaIdElementoCarrinho() {
    return new Date().getTime().toString()
}

function adicionarElementoAoCarrinho(evento) {
    // console.log(evento)

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

        // Adicionar elemento do carrinho ao Array carrinho
        const elementoDoCarrinho = {
            id: calculaIdElementoCarrinho(),
            titulo: filme.titulo,
            valor: filme.valor
        }

        carrinhoItem.id = elementoDoCarrinho.id
        car.push(elementoDoCarrinho);
        // Adicionar no sessionStorage
        sessionStorage.setItem("carrinho", JSON.stringify(car))        

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
    }
    verificarFinalizarCompra();
}

function obterFilmeDoArray(id) {
    for (let x = 0; x < filmes.length; x++) {
        if (filmes[x].id == id) {
            return filmes[x]
        }
    }
    return null;
}

function removerElementoDoDOM(evento) {
    const carrinhoItem = evento.target.parentElement
    const pCarrinhoItem = carrinhoItem.querySelectorAll("p")
    const precoCarrinhoItem = +pCarrinhoItem[1].innerText.replace(',','.')
    
    const total = document.getElementById("total")
    const valorAtual = +total.innerText.replace("Total: R$ ", "").replace(",", ".")
    const valorFinal = valorAtual - precoCarrinhoItem
    
    total.innerText = `Total: R$ ${valorFinal.toFixed(2).replace(".", ",")}`

    // Remover elemento do carrinho
    car = removeElementoDoCarrinho(carrinhoItem.id)
    // Atualizar sessionStorage
    sessionStorage.setItem("carrinho", JSON.stringify(car))
    // Remover do DOM
    carrinhoItem.remove()
    // Atualizar botão finalizar compra
    verificarFinalizarCompra();
}

function removeElementoDoCarrinho(id) {
    const newCarrinho = []
    for (let x = 0; x < car.length; x++) {
        if (car[x].id != id) {
            newCarrinho.push(car[x])
        }
    }
    return newCarrinho;
}

function verificarFinalizarCompra() {
    const carrinhoItems = document.querySelectorAll('.carrinho-item')
    const botao = document.getElementById('finalizar-compra');
    console.log(carrinhoItems)
    if (carrinhoItems.length != 0) {
        botao.classList.add("finalizar-compra")
        botao.disabled = false
    } else {
        botao.classList.remove("finalizar-compra")
        botao.disabled = true
    }
}