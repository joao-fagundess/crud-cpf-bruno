function mostrarMensagem(texto, tipo) {
  const el = document.getElementById('mensagem');
  el.textContent = texto;
  el.className = 'mensagem ' + tipo;
}

function montarLinha(pessoa) {
  return `<tr>
    <td>${escaparHtml(pessoa.id)}</td>
    <td>${escaparHtml(pessoa.cpf)}</td>
    <td>${escaparHtml(pessoa.nome)}</td>
    <td>${escaparHtml(pessoa.sobrenome)}</td>
    <td>${escaparHtml(pessoa.email)}</td>
    <td>${escaparHtml(pessoa.idade)}</td>
    <td>${escaparHtml(pessoa.telefone)}</td>
    <td>${escaparHtml(pessoa.rua)}</td>
    <td>${escaparHtml(pessoa.bairro)}</td>
    <td>${escaparHtml(pessoa.cidade)}</td>
    <td>${escaparHtml(pessoa.estado)}</td>
    <td>${escaparHtml(pessoa.rg)}</td>
  </tr>`;
}

function renderizar(lista) {
  const tabela = document.getElementById('tabela-corpo');
  tabela.innerHTML = '';
  lista.forEach(function (pessoa) {
    tabela.innerHTML += montarLinha(pessoa);
  });
}

function carregarPessoas(cpfFiltro) {
  fetch('/pessoas', { method: 'GET' })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (data) {
      let lista = data;
      if (cpfFiltro) {
        lista = data.filter(function (pessoa) {
          return somenteDigitos(pessoa.cpf) === somenteDigitos(cpfFiltro);
        });
      }

      renderizar(lista);

      if (cpfFiltro && lista.length === 0) {
        mostrarMensagem('Pessoa não encontrada!', 'erro');
      } else {
        mostrarMensagem(lista.length + ' registro(s) encontrado(s).', 'ok');
      }
    })
    .catch(function () {
      mostrarMensagem('Não foi possível carregar os registros.', 'erro');
    });
}

document.getElementById('btn-buscar').addEventListener('click', function () {
  const cpf = document.getElementById('cpfBusca').value;
  carregarPessoas(cpf);
});

document.getElementById('btn-todos').addEventListener('click', function () {
  document.getElementById('cpfBusca').value = '';
  carregarPessoas('');
});

carregarPessoas('');
