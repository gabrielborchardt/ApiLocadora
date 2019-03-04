var express = require('express');
var router = express.Router();
var locacaoController = require('../controllers/locacaoController');

router.post('/alugar', function(req, res){
    var codusuario = req.body.codusuario;
    var codfilme = req.body.codfilme;
    var qtdlocacao = req.body.qtdlocacao;
    var datlocacao = req.body.datlocacao;
    var datprevisao = req.body.datprevisao;

    locacaoController.Alugar(codusuario,codfilme,qtdlocacao,datlocacao,datprevisao, function(resp){
        
        if(resp === false)
            res.status(500).send('Não foi possível realizar a locação do filme!');
        else
            res.status(200).send('OK');

    })
});

router.post('/devolver', function(req, res){
    var codusuario = req.body.codusuario;
    var codfilme = req.body.codfilme;

    locacaoController.Devolver(codusuario,codfilme, function(resp){
        res.json(resp);
    })
});

module.exports = router;