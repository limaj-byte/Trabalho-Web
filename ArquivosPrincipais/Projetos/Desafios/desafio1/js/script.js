// pega as partes do html
const form = document.querySelector("#productForm");
const nome = document.querySelector("#nome");
const categoria = document.querySelector("#categoria");
const preco = document.querySelector("#preco");
const quantidade = document.querySelector("#quantidade");
const productList = document.querySelector("#productList");
const emptyState = document.querySelector("#emptyState");
const alertArea = document.querySelector("#alertArea");
const submitBtn = document.querySelector("#submitBtn");
const clearBtn = document.querySelector("#clearBtn");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const formTitle = document.querySelector("#formTitle");
const darkMode = document.querySelector("#darkMode");

// pega os produtos que ja foram salvos
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let editando = null;

// salva a lista no navegador
function salvar() { localStorage.setItem("produtos", JSON.stringify(produtos)); }

function mostrarAlerta(texto, tipo = "danger") {
  alertArea.innerHTML = `<div class="alert alert-${tipo}">${texto}</div>`;
}

function dinheiro(valor) {
  return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// mostra os produtos na tela
function mostrarProdutos() {
  let lista = produtos.filter(produto => produto.nome.toLowerCase().includes(searchInput.value.toLowerCase()));

  if (sortSelect.value === "low") lista.sort((a, b) => a.preco - b.preco);
  if (sortSelect.value === "high") lista.sort((a, b) => b.preco - a.preco);

  productList.innerHTML = "";
  emptyState.style.display = lista.length ? "none" : "block";

  lista.forEach(produto => {
    productList.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="product-card">
          <div class="d-flex justify-content-between">
            <strong>${produto.nome}</strong>
            <span class="category">${produto.categoria}</span>
          </div>
          <h3>${dinheiro(produto.preco)}</h3>
          <p>Quantidade: ${produto.quantidade}</p>
          <div class="actions d-flex gap-2">
            <button class="btn btn-sm btn-dark w-50" onclick="editar('${produto.id}')">Editar</button>
            <button class="btn btn-sm btn-danger w-50" onclick="excluir('${produto.id}')">Excluir</button>
          </div>
        </div>
      </div>`;
  });
}

// limpa o formulario
function limpar() {
  form.reset();
  editando = null;
  submitBtn.textContent = "Cadastrar";
  formTitle.textContent = "Novo produto";
}

// cadastra ou salva a edicao
form.addEventListener("submit", event => {
  event.preventDefault();

  if (!nome.value.trim() || !categoria.value || preco.value === "" || quantidade.value === "") {
    mostrarAlerta("Preencha todos os campos.");
    return;
  }
  if (Number(preco.value) <= 0) {
    mostrarAlerta("O preço deve ser maior que zero.");
    return;
  }
  if (Number(quantidade.value) < 0) {
    mostrarAlerta("A quantidade não pode ser negativa.");
    return;
  }

  const dados = {
    nome: nome.value.trim(),
    categoria: categoria.value,
    preco: Number(preco.value),
    quantidade: Number(quantidade.value)
  };

  if (editando) {
    Object.assign(produtos.find(produto => produto.id === editando), dados);
    mostrarAlerta("Produto atualizado!", "success");
  } else {
    produtos.push({ id: Date.now().toString(), ...dados });
    mostrarAlerta("Produto cadastrado!", "success");
  }

  salvar();
  limpar();
  mostrarProdutos();
});

// coloca os dados no formulario pra editar
function editar(id) {
  const produto = produtos.find(produto => produto.id === id);
  nome.value = produto.nome;
  categoria.value = produto.categoria;
  preco.value = produto.preco;
  quantidade.value = produto.quantidade;
  editando = id;
  submitBtn.textContent = "Salvar alterações";
  formTitle.textContent = "Editar produto";
  window.scrollTo(0, 250);
}

// apaga um produto depois de confirmar
function excluir(id) {
  const produto = produtos.find(produto => produto.id === id);
  if (!confirm("Excluir " + produto.nome + "?")) return;
  produtos = produtos.filter(produto => produto.id !== id);
  salvar();
  mostrarProdutos();
  mostrarAlerta("Produto excluído.", "success");
}

// troca entre claro e escuro e salva a escolha
function aplicarTema(escuro) {
  document.body.classList.toggle("dark", escuro);
  darkMode.textContent = escuro ? "Modo claro" : "Modo escuro";
  localStorage.setItem("temaEscuro", escuro);
}

// eventos dos botoes e dos campos
clearBtn.addEventListener("click", limpar);
searchInput.addEventListener("input", mostrarProdutos);
sortSelect.addEventListener("change", mostrarProdutos);
darkMode.addEventListener("click", () => aplicarTema(!document.body.classList.contains("dark")));

aplicarTema(localStorage.getItem("temaEscuro") === "true");
mostrarProdutos();
