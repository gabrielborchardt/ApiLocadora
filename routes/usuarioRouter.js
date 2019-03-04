var express = require('express');
var router = express.Router();
var usuarioController = require('../controllers/usuarioController');

router.get('/', function(req, res){

    usuarioController.ObterTodos(function(resp){
        res.json(resp);
    })
});

router.get('/:id', function(req, res){
    var id = req.params.id;

    usuarioController.ObterUnico(id, function(resp){
        res.json(resp);
    })
});

router.post('/cadastrar', function(req, res){
    var dscnome = req.body.dscnome;
    var dscemail = req.body.dscemail;
    var dscsenha = req.body.dscsenha;

    usuarioController.Cadastrar(dscnome, dscemail, dscsenha, function(resp){
        res.json(resp);
    })
});

module.exports = router;