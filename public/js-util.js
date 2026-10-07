function somenteDigitos(valor) {
  return String(valor || '').replace(/\D/g, '');
}

function escaparHtml(texto) {
  return String(texto === undefined || texto === null ? '' : texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
