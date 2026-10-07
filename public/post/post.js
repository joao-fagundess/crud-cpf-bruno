function lerFormulario() {
  return {
    cpf: document.getElementById('cpf').value,
    nome: document.getElementById('nome').value,
    sobrenome: document.getElementById('sobrenome').value,
    email: document.getElementById('email').value,
    idade: Number(document.getElementById('idade').value),
    telefone: document.getElementById('telefone').value,
    rua: document.getElementById('rua').value,
    bairro: document.getElementById('bairro').value,
    cidade: document.getElementById('cidade').value,
    estado: document.getElementById('estado').value,
    rg: document.getElementById('rg').value
  };
}

function mostrarMensagem(texto, tipo) {
  const el = document.getElementById('mensagem');
  el.textContent = texto;
  el.className = 'mensagem ' + tipo;
}

document.getElementById('form-post').addEventListener('submit', function (evento) {
  evento.preventDefault();

  const dados = lerFormulario();

  fetch('/pessoas')
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (lista) {
      const existe = lista.some(function (pessoa) {
        return somenteDigitos(pessoa.cpf) === somenteDigitos(dados.cpf);
      });

      if (existe) {
        mostrarMensagem('Já existe um registro com esse CPF.', 'erro');
        return;
      }

      return fetch('/pessoas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
        .then(function (resposta) {
          return resposta.json();
        })
        .then(function () {
          document.getElementById('form-post').reset();
          mostrarMensagem('Registro cadastrado com sucesso.', 'ok');
        });
    })
    .catch(function () {
      mostrarMensagem('Não foi possível cadastrar o registro.', 'erro');
    });
});
