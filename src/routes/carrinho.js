import { Router } from 'express'

const carrinhoRouters = Router()

const carrinho = []

carrinhoRouters.post("/api/carrinhos", (requisicao, resposta) => {
    // Obter os dados
    const dados = requisicao.body
    // dados = [{}, {}, {}]

    for (let x = 0; x < dados.length; x++) {
        carrinho.push(dados[x])
    }

    console.log(dados)

    return resposta.status(204).json();
})

carrinhoRouters.get("/api/carrinhos", (requiciao, resposta) => {
    return resposta.status(200).json(carrinho)
})


// RESTFULL
// /api/carrinhos/1699916132336
carrinhoRouters.get("/api/carrinhos/:id", (requisicao, resposta) => {
    // Obter o ID que foi passado na rota
    const routeID = requisicao.params.id

    // Procurar no array de carrinho se o elemento existe
    for (let x = 0; x < carrinho.length; x++) {
        if (carrinho[x].id === routeID) {
            // Se existir, 200 e o objeto
            return resposta.status(200).json(carrinho[x])
        }
    }
    // Senão, 404 e não passar nada
    return resposta.status(404).json();
}) 


// Outra maneira de exportar dados. O programador 
// pode definir o nome do objeto ao importar

export default carrinhoRouters