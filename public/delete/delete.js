function mostrarMensagem(texto, tipo) {
  const el = document.getElementById('mensagem');
  el.textContent = texto;
  el.className = 'mensagem ' + tipo;
}

document.getElementById('btn-deletar').addEventListener('click', function () {
  const cpf = document.getElementById('cpf').value;

  fetch('/pessoas')
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (data) {
      const pessoa = data.find(function (obj) {
        return somenteDigitos(obj.cpf) === somenteDigitos(cpf);
      });

      if (!pessoa) {
        mostrarMensagem('Pessoa não encontrada!', 'erro');
        return;
      }

      return fetch('/pessoas/' + pessoa.id, { method: 'DELETE' }).then(function () {
        document.getElementById('cpf').value = '';
        mostrarMensagem('Registro excluído com sucesso.', 'ok');
      });
    })
    .catch(function () {
      mostrarMensagem('Não foi possível excluir o registro.', 'erro');
    });
});
