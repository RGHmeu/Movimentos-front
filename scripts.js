/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getList = async (todos) => {
  console.log("dentro do getList");
  console.log(todos);
  let url = 'http://127.0.0.1:5000/movimentos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      
      if (todos == "Todos") {
        data.movimentos.forEach(item => insertList(item.codigo, item.descr, item.foco, item.tipo))
      }
      else if(todos !== "Todos") {
        for (let i = 0; i < data.movimentos.length; i++) {  
          console.log(data.movimentos[i].tipo);  
          if (data.movimentos[i].tipo == todos) {
            item = data.movimentos[i];
            insertList(item.codigo, item.descr, item.foco, item.tipo)
          }
        }
      }
    
    })
        .catch((error) => {
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
var todos = "Todos";
console.log("antes do getList");
console.log(todos);
getList(todos);


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputCodigo, inputDescr, inputFoco, inputTipo) => {
  const formData = new FormData();
  formData.append('codigo', inputCodigo);
  formData.append('descr', inputDescr);
  formData.append('foco', inputFoco);
  formData.append('tipo', inputTipo);

  let url = 'http://127.0.0.1:5000/movimento';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/movimento?codigo=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputCodigo = document.getElementById("newCodigo").value;
  let inputDescr = document.getElementById("newDescr").value;
  let inputFoco = document.getElementById("newFoco").value;
  let inputTipo = document.getElementById("newTipo").value;

  if (inputCodigo === '') {
    alert("Escreva o código de um movimento!");

  } else {
    insertList(inputCodigo, inputDescr, inputFoco, inputTipo)
    postItem(inputCodigo, inputDescr, inputFoco, inputTipo)
    alert("Item adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (codigo, descr, foco, tipo) => {
  var item = [codigo, descr, foco, tipo]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newCodigo").value = "";
  document.getElementById("newDescr").value = "";
  document.getElementById("newFoco").value = "";
  document.getElementById("newTipo").value = "";

  removeElement()
}

/*
  --------------------------------------------------------------------------------------
  Função para filtrar a lista exibida na tabela
  --------------------------------------------------------------------------------------
*/

function filtrar() {
    var select = document.getElementById('tipo-selecionado');
    var option = select.options[select.selectedIndex];
    let linhas = document.getElementById('myTable').rows;
    for (i= linhas.length - 1; i> 0; i--){
      document.getElementById('myTable').deleteRow(i);
    }
  getList(option.text);
}

/*
  --------------------------------------------------------------------------------------
  Função para mostrar o video do movimento associado ao código
  --------------------------------------------------------------------------------------
*/
function mostrar() {
  let e = document.getElementById('mostravideo');
  let valor = e.value;
  let text = e.name;
  console.log(valor);
  lugar = document.getElementById('aqui');
  if (valor == "Agaxa001") {
    lugar.insertAdjacentHTML("afterend", 
    "<video src='img/Agaxa001.mkv' controls='controls' autoplay='autoplay' loop='loop' height='80'</video>");
  }
  if (valor == "Aquece001") {
      lugar.insertAdjacentHTML("afterend", 
      "<video src='img/Aquece001.mkv' controls='controls' autoplay='autoplay' loop='loop' height='80'</video>");
  }
} 

    