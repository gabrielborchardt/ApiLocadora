var express = require('express');
var router = express.Router();
var filmeController = require('../controllers/filmeController');

router.get('/', function(req, res){

    filmeController.ObterFilmes(0, function(resp){
        res.json(resp);
    })
});

router.get('/:titulo', function(req, res){
    var titulo = req.params.titulo;

    filmeController.ObterFilmes(titulo, function(resp){
        res.json(resp);
    })
});

router.post('/cadastrar', function(req, res){
    var dsctitulo = req.body.dsctitulo;
    var dscdiretor = req.body.dscdiretor;
    var datlancamento = req.body.datlancamento;
    var dscsinopse = req.body.dscsinopse;
    var qtdcopia = req.body.qtdcopia;

    filmeController.Cadastrar(dsctitulo, dscdiretor, datlancamento, dscsinopse, qtdcopia, function(resp){
        res.json(resp);
    })
});

module.exports = router;