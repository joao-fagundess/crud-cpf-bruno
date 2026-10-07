function mostrarMensagem(texto, tipo) {
  const el = document.getElementById('mensagem');
  el.textContent = texto;
  el.className = 'mensagem ' + tipo;
}

function preencherFormulario(pessoa) {
  document.getElementById('id').value = pessoa.id;
  document.getElementById('cpf').value = pessoa.cpf || '';
  document.getElementById('nome').value = pessoa.nome || '';
  document.getElementById('sobrenome').value = pessoa.sobrenome || '';
  document.getElementById('email').value = pessoa.email || '';
  document.getElementById('idade').value = pessoa.idade || '';
  document.getElementById('telefone').value = pessoa.telefone || '';
  document.getElementById('rua').value = pessoa.rua || '';
  document.getElementById('bairro').value = pessoa.bairro || '';
  document.getElementById('cidade').value = pessoa.cidade || '';
  document.getElementById('estado').value = pessoa.estado || '';
  document.getElementById('rg').value = pessoa.rg || '';
}

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

document.getElementById('btn-buscar').addEventListener('click', function () {
  const cpf = document.getElementById('cpfBusca').value;

  fetch('/pessoas', { method: 'GET' })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (data) {
      const pessoaEncontrada = data.find(function (pessoa) {
        return somenteDigitos(pessoa.cpf) === somenteDigitos(cpf);
      });

      if (pessoaEncontrada) {
        preencherFormulario(pessoaEncontrada);
        mostrarMensagem('Registro encontrado. Edite e clique em Atualizar.', 'ok');
      } else {
        mostrarMensagem('Pessoa não encontrada!', 'erro');
      }
    })
    .catch(function () {
      mostrarMensagem('Não foi possível buscar o registro.', 'erro');
    });
});

document.getElementById('form-put').addEventListener('submit', function (evento) {
  evento.preventDefault();
  const id = document.getElementById('id').value;

  if (!id) {
    mostrarMensagem('Busque um CPF antes de atualizar.', 'erro');
    return;
  }

  fetch('/pessoas/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lerFormulario())
  })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function () {
      document.getElementById('form-put').reset();
      document.getElementById('id').value = '';
      document.getElementById('cpfBusca').value = '';
      mostrarMensagem('Registro atualizado com sucesso.', 'ok');
    })
    .catch(function () {
      mostrarMensagem('Não foi possível atualizar o registro.', 'erro');
    });
});
