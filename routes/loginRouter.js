var express = require('express');
var router = express.Router();
var usuarioController = require('../controllers/usuarioController');

router.post('/', function(req, res){

    var dscemail = req.body.dscemail;
    var dscsenha = req.body.dscsenha;

    usuarioController.Autenticacao(dscemail, dscsenha, function(resp){
        
        if(resp === false)
            res.status(500).send('Login inválido!');
        else
            res.status(200).send('OK');
    })
});

module.exports = router;