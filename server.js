const path = require('path');
const express = require('express');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const porta = process.env.PORT || 3000;

server.use(express.static(path.join(__dirname, 'public')));
server.use(middlewares);
server.use(router);

server.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(porta, () => {
  console.log(`JSON SERVER + Express rodando em http://localhost:${porta}`);
});
