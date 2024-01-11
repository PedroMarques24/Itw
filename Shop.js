let inputPrecoTotal = document.getElementById("total");
let inputQtdTotal = document.getElementById("quantidades");
let precoTotal = 0;
let qtdTotal = 0;


function addProduct(number) {
  let quantidadeProdutoSelecionado = document.getElementById("qty" + number);
  quantidadeProdutoSelecionado.value++;
  calculate();
}

function calculate() {
  let precAtual, qtdAtual;
  precoTotal = 0;
  qtdTotal = 0;

  for (let i = 1; i <= 24; i++) {
    precAtual = parseFloat(document.getElementById('price' + i).value);
    qtdAtual = parseFloat(document.getElementById('qty' + i).value);
    precoTotal += precAtual * qtdAtual;
    qtdTotal += qtdAtual;
  }


  inputQtdTotal.innerText = qtdTotal;
  inputPrecoTotal.innerText = precoTotal.toFixed(2);
}

function valid() {
  if (precoTotal <= 0 && qtdTotal <= 0) {
    alert("Erro o carrinho está vazio");
    return false;
  } else {
    return true
  }
}

function clean() {
  for (let i = 1; i <= 24; i++) {
    qtdAtual = document.getElementById('qty' + i).value = 0;
  }
  precoTotal = 0;
  qtdTotal = 0;
  inputPrecoTotal.innerText = "0.00";
  inputQtdTotal.innerText = 0;
}
// Get the modal
var modal = document.getElementById("myModal");
var modalImg = document.querySelector('.modal-content');
// Get all images and insert them inside the modal
var imgs = document.getElementsByClassName("modalImage");
for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    img.onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.src;
    }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}