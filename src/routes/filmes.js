import { Router } from "express";


const filmes = [
    {
      id: 0,
      img: "https://4.bp.blogspot.com/-GW1Ex5rl1o8/VMG9B8zuM2I/AAAAAAAAQ-A/PdXFAKUlN2c/s1600/somaoredor1.jpeg",
      titulo: "O Som ao redor",
      descricao:
        "O Som ao Redor começa com a chegada de uma milícia a uma rua de classe média da cidade do Recife, onde    diferentes narrativas acabam se cruzando. Segundo a Associação Brasileira de Críticos de Cinema (Abraccine), é o 15º melhor filme da história do cinema nacional.",
      ano: 2013,
      direcao: "Kleber Mendonça",
      genero: "Suspense, Drama",
      valor: "3,50",
    },
    {
      id: 1,
      img: "https://upload.wikimedia.org/wikipedia/pt/2/29/Central_do_Brasil_poster.jpg",
      titulo: "Central do Brasil",
      descricao:
        "Dora, uma ex-professora que escreve cartas na Central do Brasil, e o menino Josué, que fica órfão da noite para o dia. O filme, que emocionou o mundo, recebeu duas indicações ao Oscar: nas categorias melhor filme estrangeiro e melhor atriz.",
      ano: 1998,
      direcao: "Walter Salles",
      genero: "Drama",
      valor: "4,50",
    },
    {
      id: 2,
      img: "https://upload.wikimedia.org/wikipedia/pt/thumb/1/10/CidadedeDeus.jpg/220px-CidadedeDeus.jpg",
      titulo: "Cidade de Deus",
      descricao:
        'Nos anos 1960, a favela é um complexo habitacional recém-construído longe do centro do Rio de Janeiro, com pouco acesso à eletricidade e água. Três ladrões amadores conhecido como "Trio Ternura" — Cabeleira, Alicate e Marreco — aterrorizam os negócios locais. Marreco é o irmão de Buscapé. Como Robin Hood, eles dividem parte do dinheiro roubado com os habitantes da favela chamada de Cidade de Deus e, em troca, são protegidos por eles.',
      ano: 2002,
      direcao: "Fernando Meirelles",
      genero: "Drama, Ação",
      valor: "3,50",
    },
    {
      id: 3,
      img: "https://upload.wikimedia.org/wikipedia/pt/thumb/2/2a/TropaDeElitePoster.jpg/250px-TropaDeElitePoster.jpg",
      titulo: "Tropa de Elite",
      descricao:
        "Os acontecimentos do filme são narrados em primeira pessoa pelo Capitão Roberto Nascimento, dando uma perspectiva ao espectador de todos os fatos interligados. O filme começa in medias res, no ano de 1997, em um baile funk no Morro da Babilônia, uma das principais bases do narcotráfico da cidade Rio de Janeiro.",
      ano: 2007,
      direcao: "José Padilha",
      genero: "Drama, Policial",
      valor: "4,99",
    },
  ];



// A importação exige o come do objeto, ou seja, filmesRoutes
export const filmesRoutes = Router()

filmesRoutes.get("/api/filmes", (_, res) => {
    return res.status(200).json(filmes)
})

