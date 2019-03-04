'user strict';
var db = require('../config/dbConfig'); 

var Clientes = {
    //Listar Todos
    ObterTodos: function(result) {

        //Executa Query
        db.query('SELECT * FROM PES_USUARIO', function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err);
            }
            else{
                console.log('usuários : ', res);  
                result(res);
            }
        });
    },
    //Listar Único
    ObterUnico: function(id, result){
        //Executa Query
        db.query('SELECT * FROM PES_USUARIO WHERE CODUSUARIO = ?',[id], function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err);
            }
            else{
                console.log('usuário : ', res);  
                result(res);
            }
        });
    },
    //Cadastrar
    Cadastrar: function(dscnome, dscemail, dscsenha, result) {    
    
        var sql = " INSERT INTO PES_USUARIO (DSCNOME,DSCEMAIL,DSCSENHA) "
            sql += " VALUES('"+dscnome+"','"+dscemail+"','"+dscsenha+"') "

        console.log("SQL: ", sql);

        db.query(sql,function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err);
            }
            else{
                console.log(res.insertId);
                result(res.insertId);
            }
        });
    },
    //Login
    Autenticacao: function(dscemail,dscsenha,result){
        
        //Executa Query
        var sql = "SELECT * FROM PES_USUARIO WHERE 1=1 " 
            sql += " AND DSCEMAIL = '"+ dscemail + "'";
            sql += " AND DSCSENHA = '"+ dscsenha + "'";
        
        console.log("SQL: ", sql);

        db.query(sql, function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(false);
            }
            else{
                console.log("res.length: ", res.length);

                if(res.length > 0)
                    result(true);
                else
                    result(false);
            }
        });
    }
};

module.exports = Clientes;