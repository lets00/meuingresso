// const express = require("express")
import express from "express"
import cors from "cors"
import { filmesRoutes } from "./src/routes/filmes.js"
import carR from "./src/routes/carrinho.js"


// Obter os filmes
const app = express();

// Configurando a API
app.use(express.json())
app.use(express.static("public/"))
app.use(cors());

// Rotas do usuário
app.use(filmesRoutes)
app.use(carR)

// MÉTODOS HTTP
app.get("/api/hello", (_, res) => {
    return res.status(200).json({ "msg": "Olá mundo!" })
}
)



app.listen(3333, () => {
    console.log("Seu servidor foi levantado")
})


// function hello(requisicao, resposta) {
//     return resposta.status(200).json({ "msg": "Olá mundo!" })
// }

// function ola() {
//     console.log("Seu servidor foi levantado")
// }




