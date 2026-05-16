const data = {

  produtos: [

    {
      id: 1,
      nome: "iPhone 15",
      preco: 5999.90,
      categoria: "Celulares",
      imagem: "iphone.jpg",
      imagemDetalhes: "iphone-frente.jpg",
      descricao: "Smartphone premium da Apple.",
      emEstoque: true
    },

    {
      id: 2,
      nome: "Galaxy S24",
      preco: 4899.90,
      categoria: "Celulares",
      imagem: "galaxy.jpg",
      imagemDetalhes: "galaxy-frente.jpg",
      descricao: "Celular Samsung topo de linha.",
      emEstoque: true
    },

    {
      id: 3,
      nome: "Notebook Dell",
      preco: 4200.00,
      categoria: "Notebooks",
      imagem: "notebook.jpg",
      imagemDetalhes: "notebook-amostra.jpg",
      descricao: "Notebook para produtividade.",
      emEstoque: false
    },

    {
      id: 4,
      nome: "Headset Gamer",
      preco: 299.90,
      categoria: "Acessórios",
      imagem: "headset.jpg",
      imagemDetalhes: "headset-perto.jpg",
      descricao: "Headset RGB para jogos.",
      emEstoque: true
    },

    {
      id: 5,
      nome: "PlayStation 5",
      preco: 3999.90,
      categoria: "Games",
      imagem: "ps5.jpg",
      imagemDetalhes: "ps5-longe.jpg",
      descricao: "Console de nova geração.",
      emEstoque: true
    },

    {
      id: 6,
      nome: "Mouse Gamer",
      preco: 149.90,
      categoria: "Acessórios",
      imagem: "mouse-perto.jpg",
      imagemDetalhes: "mouse.jpg",
      descricao: "Mouse gamer de alta precisão.",
      emEstoque: true
    },

    {
      id: 7,
      nome: "MacBook Air",
      preco: 8999.90,
      categoria: "Notebooks",
      imagem: "macbook.JPG",
      imagemDetalhes: "macbook-frente.jpg",
      descricao: "Notebook leve e potente.",
      emEstoque: false
    },

    {
      id: 8,
      nome: "Nintendo Switch",
      preco: 2299.90,
      categoria: "Games",
      imagem: "switch.jpg",
      imagemDetalhes: "switch-frente.jpg",
      descricao: "Console híbrido portátil.",
      emEstoque: true
    }

  ]

};


// SELEÇÃO DE ELEMENTOS (DOM)

const productList =
  document.getElementById("product-list");

const productDetails =
  document.getElementById("product-details");

const searchInput =
  document.querySelector("#search");

const categorySelect =
  document.querySelector("#category");

const btnRender =
  document.querySelector("#btnRender");


// FUNÇÕES

function formatPrice(preco) {

  return `R$ ${preco.toFixed(2)}`;

}


function createProductCard(produto) {

  const card = document.createElement("div");

  card.classList.add("card");

  card.setAttribute("data-id", produto.id);

  // style 
  card.style.border = "1px solid #ccc";


  const image = document.createElement("img");
  image.src = produto.imagem;
  image.alt = produto.nome;


  const title = document.createElement("h3");

  title.classList.add("card-title");

  title.textContent = produto.nome;


  const price = document.createElement("p");

  price.textContent =
    formatPrice(produto.preco);


  const category = document.createElement("p");

  category.textContent =
    `Categoria: ${produto.categoria}`;


  const detailsBtn =
    document.createElement("button");

  detailsBtn.textContent =
    "Ver detalhes";


  const highlightBtn =
    document.createElement("button");

  highlightBtn.textContent =
    "Destacar";


  // EVENTOS

  detailsBtn.addEventListener("click", () => {

    showProductDetails(produto);

  });


  highlightBtn.addEventListener("click", () => {

    card.classList.toggle("highlight");

  });


  // APPEND

  card.appendChild(image);

  card.appendChild(title);

  card.appendChild(price);

  card.appendChild(category);

  card.appendChild(detailsBtn);

  card.appendChild(highlightBtn);


  return card;

}


function renderProducts(produtos) {

  productList.innerHTML = "";


  produtos.forEach(produto => {

    const card =
      createProductCard(produto);

    productList.appendChild(card);

  });


  // querySelectorAll

  const cards =
    document.querySelectorAll(".card");


  cards.forEach(card => {

    console.log(
      card.getAttribute("data-id")
    );

  });

}


function renderCategories() {

  const categorias = [

    ...new Set(

      data.produtos.map(
        produto => produto.categoria
      )

    )

  ];


  categorySelect.innerHTML =
    `<option>Todas</option>`;


  categorias.forEach(categoria => {

    const option =
      document.createElement("option");

    option.value = categoria;

    option.textContent = categoria;

    categorySelect.appendChild(option);

  });

}


function showProductDetails(produto) {

  productDetails.innerHTML = `

        <h2>${produto.nome}</h2>

        <p><strong>Preço:</strong>
        ${formatPrice(produto.preco)}</p>

        <p><strong>Categoria:</strong>
        ${produto.categoria}</p>

        <p><strong>Estoque:</strong>
        ${produto.emEstoque
      ? "Disponível"
      : "Indisponível"
    }</p>

        <p>${produto.descricao}</p>

        <img src="${produto.imagemDetalhes}" 
        alt="${produto.nome}"
        class="details-image">

    `;

}


function filterProducts() {

  const searchText =
    searchInput.value.toLowerCase();

  const selectedCategory =
    categorySelect.value;


  return data.produtos.filter(produto => {

    const matchText =

      produto.nome
        .toLowerCase()
        .includes(searchText);


    const matchCategory =

      selectedCategory === "Todas"

      ||

      produto.categoria ===
      selectedCategory;


    return matchText && matchCategory;

  });

}


// EVENTOS

searchInput.addEventListener("input", () => {

  renderProducts(filterProducts());

});


categorySelect.addEventListener("change", () => {

  renderProducts(filterProducts());

});


btnRender.addEventListener("click", () => {

  renderProducts(filterProducts());

});


// INICIALIZAÇÃO

renderCategories();

renderProducts(data.produtos);


