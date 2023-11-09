window.addEventListener("load", main);

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

function main() {
  const div = document.getElementById("filmes");
  calculaTotal();
  //  criar as sections para adicionar os filmes no array

  for (let x = 0; x < filmes.length; x++) {
    const section = document.createElement("section");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const ul = document.createElement("ul");
    const ano = document.createElement("li");
    const direcao = document.createElement("li");
    const genero = document.createElement("li");
    const valor = document.createElement("li");
    const button = document.createElement("button");

    section.id = filmes[x].id;
    img.width = "100";
    img.height = "150";
    img.src = filmes[x].img;
    h2.textContent = filmes[x].titulo;
    p.textContent = filmes[x].descricao;
    ano.textContent = `Ano: ${filmes[x].ano}`;
    direcao.textContent = `Direção: ${filmes[x].direcao}`;
    genero.textContent = `Gênero: ${filmes[x].genero}`;
    valor.textContent = `R$ ${filmes[x].valor}`;
    button.textContent = "Adicionar ao carrinho";
    button.addEventListener("click", adicionarElementoAoCarrinho);

    ul.appendChild(ano);
    ul.appendChild(direcao);
    ul.appendChild(genero);
    ul.appendChild(valor);
    section.append(img);
    section.append(h2);
    section.append(p);
    section.append(ul);
    section.append(button);
    div.appendChild(section);
  }
}

function adicionarElementoAoCarrinho(evento) {
  const id = evento.target.parentElement.id;

  const elemento = procurarElemento(id);

  if (elemento != null) {
    const carrinho = document.getElementsByClassName("carrinho");
    carrinho[0].innerHTML += `
    <div class="carrinho-item">
      <img height="30" width="15" src=${elemento.img}>
      <p>${elemento.titulo}</p>
      <input value="1">
      <p class="valor">R$ ${elemento.valor}</p>
      <button class="excluir">X</button>
    </div>
    `;

    const botaoExcluir = document.getElementsByClassName("excluir");
    // console.log(botaoExcluir)
    for(let x = 0; x < botaoExcluir.length; x++) {
      botaoExcluir[x].addEventListener("click", excluirElementoDoCarrinho);
    }
    
    // Habilita botão se for o primeiro elemento a ser adicionado
    const finalizarCompra = document.getElementById("finalizar-compra");
    if(finalizarCompra.classList == false) {
      finalizarCompra.className = "finalizar-compra"
    }
    calculaTotal()
  }
}

function excluirElementoDoCarrinho(evento) {
  console.log("Excluindo elemento...")
  evento.target.parentElement.remove();
  const itensDoCarrinho = document.querySelector(".carrinho-item");
  if(itensDoCarrinho === null) {
    const finalizarCompra = document.getElementById("finalizar-compra");
    finalizarCompra.className = ""
  }
  calculaTotal()
}

function procurarElemento(id) {
  for (let x = 0; x < filmes.length; x++) {
    if (filmes[x].id == id) {
      return filmes[x];
    }
  }
  return null;
}

function calculaTotal() {
  const carrinho = document.getElementsByClassName("carrinho")
  const totalElemento = carrinho[0].querySelector("#total");
  const itensDoCarrinho = carrinho[0].querySelectorAll(".carrinho-item");

  let total = 0;
  if (itensDoCarrinho !== null) {
    for (let x = 0 ; x < itensDoCarrinho.length; x++) {
      const todosOsParagrafos = itensDoCarrinho[x].querySelectorAll("p");
      // O segundo elemento p, é o preço, logo: todosOsParagrafos[1]
      let textoDoPreco = +todosOsParagrafos[1].innerText.replace("R$ ","").replace(",", ".");
      total = total + textoDoPreco;
    }
  }
  totalElemento.innerText = `R$ ${total.toFixed(2)}`
  totalElemento.innerText = totalElemento.innerText.replace(".", ",")
}