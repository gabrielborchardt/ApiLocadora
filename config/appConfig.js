var express = require('express');
var bodyParser = require('body-parser');
var port = 3000; //porta padrão

var app = module.exports =  express();

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

//configurando o body parser para pegar POSTS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS - Permite acesso de outras aplicações a API
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Origin','GET,POST,PUT,DELETE');
    next();
})

